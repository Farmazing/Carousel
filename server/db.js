const mongoose = require('mongoose');
const Products = require('./products.js');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('db connected!');
});

const atlasDB = 'mongodb+srv://JoelArmendariz:JoelArmendariz_6719@cluster0-osjds.mongodb.net/amishon?retryWrites=true&w=majority'

const localDB = 'mongodb://127.0.0.1/Amishon'

mongoose.connect(atlasDB, { useNewUrlParser: true });

const productsSchema = new mongoose.Schema({
  id: Number,
  image: [String],
  name: String,
  rating: Number,
  price: Number,
  prime: Boolean,
  category_id: Number
});

const products = mongoose.model('products', productsSchema);

// products.insertMany(Products.data, (err, res) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('successfully seeded');
//   }
// })

const getCategory = (product, callback) => {
  products.find({'id': product})
    .then((res) => {
      let categoryID = res[0].category_id;
      products.find({category_id: categoryID}, (err, res) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, res);
        }
      })
    })
}

const getImages = (product, callback) => {
  products.find({id: product}, (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, res);
    }
  })
}

module.exports = { getCategory, getImages }