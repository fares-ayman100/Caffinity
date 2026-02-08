const validator = require('validator');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is Required'],
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
    confirmPassword: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: 'PasswordConfirm not the same passwrod',
      },
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'admin'],
    },
  },

);


userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

  // instance method (available in all user document)
userSchema.methods.correctPassword = async function (
  enterPassword,
  hashedPassword,
) {
  return await bcrypt.compare(enterPassword, hashedPassword);
};
const User = mongoose.model('User', userSchema);
module.exports = User;
