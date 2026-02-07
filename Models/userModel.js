const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'first name is Required'],
    },
    lastName: {
      type: String,
      required: [true, 'last name is Required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      lowercase: true,
      validate: [
        validator.isEmail,
        'please provide a valid email',
      ],
    },

    password: {
      type: String,
      required: [true, 'password is required'],
      minlength: [8, 'password must atleast 8 charachter'],
      select: false,
    },
  },

  // to make virtual field show with another field in output
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  },
);

userSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});
const User = mongoose.model('User', userSchema);
module.exports = User;
