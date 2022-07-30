// const jwt = require('jsonwebtoken');
// gunakan model mahasiswa yang sudah dibuat untuk mengelola database
const { response } = require('express');
const Mahasiwa = require('../models/mahasiswa');
const mahasiswaRouter = require('express').Router();
var multer = require('multer'); //upload gambar

// midware upload
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
}).single('imageMHS');

// TAMPILKAN SEMUA DATA MAHASISWA
// mahasiswaRouter.get('/', verifyUser, async (req, res, next) => {
mahasiswaRouter.get('/', async (req, res, next) => {
  if (req.session.user != undefined) {
    const response = await Mahasiwa.find({});
    res.render("dashboard", { data: response, title: "CRUD | NODEJS" })
  }else{
    res.redirect('/');
  }
  
});

mahasiswaRouter.get('/lihat', async (req, res, next) => {
  const response = await Mahasiwa.find({});
  res.json({ response })

});
// TAMBAH DATA MAHASIWA
mahasiswaRouter.post('/add', async (req, res) => {
  //jwtVerify(req.token, res);

  // lanjutkan  
  const tambahMahasiswa = new Mahasiwa({
    nim: req.body.nim,
    nama: req.body.nama,
    email: req.body.email,
    image: Buffer,
  });
  try {
    tambahMahasiswa.save()
    res.redirect('/mahasiswa');
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
});

// UBAH DATA MAHASISWA
mahasiswaRouter.post('/update/(:id)', async (req, res) => {
  //jwtVerify(req.token, res);
  // lanjutkan
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await Mahasiwa.findByIdAndUpdate(
      id, updatedData, options
    )
    res.redirect('/mahasiswa');
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
});

// HAPUS DATA MAHASISWA
mahasiswaRouter.post('/delete/(:id)', async (req, res) => {
  //jwtVerify(req.token, res);
  try {
    const id = req.params.id;
    const data = await Mahasiwa.findByIdAndDelete(id)
    res.redirect('/mahasiswa');
  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
});

// UPLOAD FOTO MAHASISWA
mahasiswaRouter.post('/file/(:id)', upload, async (req, res, next) => {

  try {
    const id = req.params.id;
    const updatedData = req.file.filename;
    //console.log(updatedData);
    await Mahasiwa.findByIdAndUpdate(
      id, { "image": updatedData }
    )
    res.redirect('/mahasiswa');

  }
  catch (error) {
    res.status(400).json({ message: error.message })
  }
});

module.exports = mahasiswaRouter;
