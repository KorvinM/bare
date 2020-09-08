/* Bare bones Express*/

// require express
const express= require ('express')

// require path
const path = require('path')

//variables for production
const compression = require('compression');
const helmet = require('helmet');
const cacheTime = 86400000 * 30
// variables for development
const port = 3000

// create the express app object
const app = express()

// load custom modules
const wiki = require ('./wiki-route.js');
const blogs = require ('./blogs-route.js');

// use helmet to add a subset of available http headers
app.use(helmet());

/* Static files: use the express.static middleware, the only default middleware function included in Express*/
app.use(express.static ('public', {
  maxAge: cacheTime}))

/* setup views & templating*/

//set views directory
app.set('views', path.join(__dirname, 'views'));
//set template engine to pug
app.set('view engine', 'pug');

/* Route Handlers: callback functions on any HTTP verb, (get, post, etc..)
 * parameters: request and response objects (as supplied by node.js)*/

app.use(compression()); //Compress all routes before they are defined

app.get('/', (req, res) => {
  res.render('index',
  {title : 'Welcome',
   content: 'This is boilerplate Express, using Pug templating'})
})
app.get('/credits', (req, res) => {
  res.render('credits',
  {title : 'Credits & Acknowledgements',
   content: 'This project is based on work by other hands.'})
})
// simple template-free route handler: calls send() on the response & returns the string "Hello World!"
// other response methods for ending the request/response cycle exist
// eg: res.json() res.sendFile()
app.get('/hello', (req, res) => {
  res.send('Hello World.')
})
// we can also group related routes as a module, which we require above and use here
app.use('/wiki', wiki);
app.use('/blogs', blogs);
// for 404 errors, we should place them as the last route in the stack here. This would catch any routes, as well as catching requests for static resources, if not defined earlier in the file.
app.use(function (req,res,next){
  res.status(404).render('index',
  {title: '404: Not Found',
   content: 'The resource you requested has not been found. Either it has been removed, or never existed.'})
})
// catch-all error handler
app.use((error, req, res, next) => {
    res.status(error.status).send({
      error: {
        status: error.status,
        message: error.message
      },
    });
  });

/* server */
app.listen(process.env.PORT || port, () => {
  //console.log(`Bare listening at port:${port}`)
  //the above line gives a misleading log in production
  console.log(`Bare listening`)
})
