const { Schema, default: mongoose } = require('mongoose');
const loginSchema = new Schema(
  {
    // property : nama, type data : String
    username: String,
    password: String,
    email: String,
  },
  {
    // collection adalah sebuah tabel pada database
    collection: 'login',
  }
);
const Login = mongoose.model('Login', loginSchema);

module.exports = Login;
