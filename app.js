/*Bare bones Express*/

// standard variables for setting up express
const express= require ('express')
const app = express()
const path = require('path')
const port = 3000

//custom modules
const wiki = require ('./wiki-route.js');

/* Templating*/

//set views directory
app.set('views', path.join(__dirname, 'views'));
//set the engine to pug
app.set('view engine', 'pug');

/* Route Handlers: callback functions on any HTTP verb, (get, post, etc..)
 * parameters: request and response objects (as supplied by node.js)*/

app.get('/', (req, res) => {
  res.render('index',
  {title : 'Welcome',
   content: 'This is boilerplate Express, using Pug templating'})
})
// simple template-free route handler: calls send() on the response & returns the string "Hello World!"
// other response methods for ending the request/response cycle exist
// eg: res.json() res.sendFile()
app.get('/hello', (req, res) => {
  res.send('Hello World.')
})
// we can also group related routes as a module, which we require above and use here
app.use('/wiki', wiki);

/*Static files: use the express.static middleware, the only middleware function that is actually part of Express*/

app.use(express.static ('public'))

/* local server */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
