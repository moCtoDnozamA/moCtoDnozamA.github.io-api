/**
 * @Author: xiaojiezhang
 * @Date:   2019-02-15T11:47:55-05:00
 * @Last modified by:   xiaojiezhang
 * @Last modified time: 2019-02-15T11:57:34-05:00
 */
module.exports = function () {
  const Product = require('../app/models/product')
  const mongoose = require('mongoose')
  mongoose.Promise = global.Promise

  Product.collection.drop()
  Product.create([{
    imagePath: 'url1',
    title: 'title1',
    description: 'aaa',
    price: 10
  }, {
    imagePath: 'a',
    title: 'a',
    description: 'a',
    price: 100000
  }])
    .then(product => {
      console.log(`${product.length} products created`)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      mongoose.connection.close()
    })
}
