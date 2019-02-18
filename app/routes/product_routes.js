// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for products
const Product = require('../models/product')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
// const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { product: { title: '', text: 'foo' } } -> { product: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /products
router.get('/products', (req, res, next) => {
  Product.find()
    .then(products => {
      // `products` will be an array of Mongoose documents
      // we want to convert each one to a POJO, so we use `.map` to
      // apply `.toObject` to each one
      return products.map(product => product.toObject())
    })
    // respond with status 200 and JSON of the products
    .then(products => res.status(200).json({ products: products }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /products/5a7db6c74d55bc51bdf39793
router.get('/products/:id', (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Product.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "product" JSON
    .then(product => res.status(200).json({ product: product.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /products
router.post('/products', (req, res, next) => {
  // set owner of new product to be current user
  // req.body.product.owner = req.user.id
  Product.collection.drop()
  const products = [
    {
      imagePath: 'https://i.imgur.com/lnR1YSI.jpg',
      title: 'REDESS Beanie Hat for Men and Women Winter Warm Hats Knit Slouchy Thick Skull Cap',
      description: 'COMFORTABLE TO WEAR: This winter warm hat for men is made of high quality materials and well designed to fit men. With adjustable rubber band built inside perfect adjustability is available.',
      price: 19.99
    }, {
      imagePath: 'https://i.imgur.com/WoyMZUw.jpg',
      title: 'Lisianthus Women Belt Buckle Fedora Hat',
      description: 'Breathable, lightweight and comfortable for all-day wear',
      price: 16.45
    }, {
      imagePath: 'https://i.imgur.com/jrsvwuZ.jpg',
      title: 'KBETHOS Lit Patch Finesse Self Made Dad Hat Baseball Cap Polo Style Unconstructed Cotton Adjustable',
      description: 'ADJUSTABLE BUCKLE CLOSURE: One Size Fits Most, Comfortable Everyday Fit. Use the convenient metal closure to custom fit the baseball cap to your head and ensure maximum comfort and a secure fit at all times. The unisex design makes it suitably perfect for both men and women.',
      price: 13.99
    }, {
      imagePath: 'https://i.imgur.com/GZYVYsi.jpg',
      title: 'Prevue Pet Products Stainless Steel Playtop Bird Cage',
      description: 'ADVANCED TECHNOLOGY: Columbia Unisex Bora Bora Booney fishing hat features our signature wicking fabric with sweat-wicking capabilities and UPF 50 sun protection technology that helps shield you from harmful UVA and UVB rays.',
      price: 24.45
    }
  ]
  Product.create(products)
    // respond to succesful `create` with status 201 and JSON of new "product"
    .then(products => {
      res.status(201).json({ products: products })
    })
    // if an error occurs, pass it off to our error handler
    // the error handler needs the error message and the `res` object so that it
    // can send an error message back to the client
    .catch(next)
})

// UPDATE
// PATCH /products/5a7db6c74d55bc51bdf39793
router.patch('/products/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  // delete req.body.product.owner

  Product.findById(req.params.id)
    .then(handle404)
    .then(product => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      // requireOwnership(req, product)

      // pass the result of Mongoose's `.update` to the next `.then`
      return product.update(req.body.product)
    })
    // if that succeeded, return 204 and no JSON
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /products/5a7db6c74d55bc51bdf39793
router.delete('/products/:id', requireToken, (req, res, next) => {
  Product.findById(req.params.id)
    .then(handle404)
    .then(product => {
      // throw an error if current user doesn't own `product`
      // requireOwnership(req, product)
      // delete the product ONLY IF the above didn't throw
      product.remove()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
