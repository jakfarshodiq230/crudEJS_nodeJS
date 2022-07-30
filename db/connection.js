const { default: mongoose } = require('mongoose');
// const mongoURI =
//   'mongodb+srv://jakfar:jCkAyv3zRT0Pk1Qp@apliaksi.eoxxp.mongodb.net/?retryWrites=true&w=majority';
const mongoLocal = 'mongodb://localhost:27017/';

mongoose.connect(mongoLocal)
  .then( () => {
    console.log('Connection to the Atlas Cluster is successful!')
  })
  .catch( (err) => console.error(err));
  
