const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (prop) => `${prop.value} is not valid email`,
    },
    required: [true, 'User email is required'],
  },
  password: { type: String, minLength: 6, required: true },
  token: String,
});

exports.User = mongoose.model('User',userSchema);
