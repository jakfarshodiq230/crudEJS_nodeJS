const { Schema, default: mongoose } = require('mongoose');
const mahasiswaSchema = new Schema(
  {
    // property : nama, type data : String
    nama: String,
    nim: String,
    email: String,
    image: String,
    // image:
    // {
    //     data: Buffer,
    //     contentType: String
    // }
  },
  {
    // collection adalah sebuah tabel pada database
    collection: 'mahasiswa',
  }
);
const Mahasiwa = mongoose.model('Mahasiwa', mahasiswaSchema);

module.exports = Mahasiwa;
