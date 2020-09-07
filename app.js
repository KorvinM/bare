/*Bare bones Express*/

// standard variables for setting up express
const express= require ('express')
const app = express()
const path = require('path')
const port = 3000

//custom modules
const wiki = require ('./wiki-route.js');
const blogs = require ('./blogs-route.js');

/*Static files: use the express.static middleware, the only middleware function that is actually part of Express*/
app.use(express.static ('public'))

/* setup Views/templating*/

//set views directory
app.set('views', path.join(__dirname, 'views'));
//set template engine to pug
app.set('view engine', 'pug');

/* Route Handlers: callback functions on any HTTP verb, (get, post, etc..)
 * parameters: request and response objects (as supplied by node.js)*/

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

/* local server */
app.listen(port, () => {
  console.log(`Bare listening at http://localhost:${port}`)
})
