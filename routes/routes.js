const express = require('express')
const router = express.Router();

const wiki = require ('./wiki-route.js');
const blogs = require ('./blogs-route.js')

/* Route Handlers: callback functions on any HTTP verb, (get, post, etc..)
 * parameters: request and response objects (as supplied by node.js)*/

router.get('/', (req, res) => {
  res.render('index',
  {title : 'Welcome',
   content: 'BARE: Boilerplate Application Running Express'})
})
router.get('/credits', (req, res) => {
  res.render('credits',
  {title : 'Credits & Acknowledgements',
   content: 'This project is based on work by other hands.'})
})
// simple template-free route handler: calls send() on the response & returns the string "Hello World!"
// other response methods for ending the request/response cycle exist
// eg: res.json() res.sendFile()
router.get('/hello', (req, res) => {
  res.send('Hello World.')
})

//routes with sub-routes have their own modules
router.use('/wiki', wiki)
router.use('/blogs', blogs)

module.exports = router
