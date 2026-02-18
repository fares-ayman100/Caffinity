const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');
const httpStatus = require('../Utils/httpStatus');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');
const Product = require('../Models/productsModel');
const Order = require('../Models/ordersModel');
const User = require('../Models/userModel');
const factory = require('./handelrFactory');

const checkoutSession = catchAsync(async (req, res, next) => {
  const items = req.body.items;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return next(new AppError('Please provide cart items', 400));
  }

  items.forEach((item) => {
    if (!item.productId || !item.quantity || item.quantity < 1) {
      return next(new AppError('Invalid cart item', 400));
    }
  });

  const productIds = items.map((i) => i.productId);

  const products = await Product.find({
    _id: { $in: productIds },
    isAvailable: true,
  });

  if (!products.length) {
    return next(new AppError('No available products found', 400));
  }

  const productsMap = new Map(
    products.map((p) => [p._id.toString(), p]),
  );

  const line_items = items.map((item) => {
    const product = productsMap.get(item.productId.toString());

    if (!product) {
      throw new AppError('Product not found or unavailable', 400);
    }

    return {
      price_data: {
        currency: product.currency.toLowerCase(),
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: product.name,
          description: product.description,
          images: [product.image],
          metadata: {
            productId: product._id.toString(),
          },
        },
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    // order-confirmation
    success_url: `${req.protocol}://${req.get('host')}/order-confirmation`,
    cancel_url: `${req.protocol}://${req.get('host')}/cart`,

    customer_email: req.user.email,

    line_items,
  });

  res.status(200).json({
    status: httpStatus.SUCCESS,
    session,
  });
});

const createOrderFromCheckout = async (session) => {
  // 1) get user
  const user = await User.findOne({
    email: session.customer_email,
  });

  if (!user) return;

  const existingOrder = await Order.findOne({
    stripeSessionId: session.id,
  });

  if (existingOrder) {
    console.log('Webhook duplicate ignored');
    return;
  }

  // 2) get line items from Stripe
  const lineItems = await stripe.checkout.sessions.listLineItems(
    session.id,
    { expand: ['data.price.product'] },
  );

  // 3) build order items
  const items = lineItems.data.map((item) => ({
    product: new mongoose.Types.ObjectId(
      item.price.product.metadata.productId,
    ),
    name: item.description,
    price: item.price.unit_amount / 100,
    quantity: item.quantity,
    image: item.price.product.images?.[0] || '',
  }));

  // 4) create order
  await Order.create({
    user: user.id,
    items,
    totalPrice: session.amount_total / 100,
    currency: session.currency,
    stripeSessionId: session.id,
    paymentStatus: 'paid',
  });
};

const webhookCheckout = async (req, res) => {
  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SIGNATURE,
    );
  } catch (err) {
    return res.status(400).send(`Webhook error: ${err.message}`);
  }

  // checkout completed
  if (event.type === 'checkout.session.completed') {
    await createOrderFromCheckout(event.data.object);
  }

  res.status(200).json({ received: true });
};
const getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: orders,
  });
});

const getAllOrders = factory.getAllDoc(Order);
const getOneOrder = factory.getDoc(Order);
const updateOrder = factory.updateDoc(Order);
const deleteOrder = factory.deleteDoc(Order);

module.exports = {
  checkoutSession,
  webhookCheckout,
  getAllOrders,
  getOneOrder,
  updateOrder,
  deleteOrder,
  getMyOrders,
};
