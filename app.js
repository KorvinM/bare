/* Bare bones Express*/

// require express
const express= require ('express')

//variables for production
const compression = require('compression');
const helmet = require('helmet');
const cacheTime = 86400000 * 30

// require path
const path = require('path')

//require routes module
const routes = require('./routes/routes')

// create the express app object
const app = express()

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

/* Routes */
app.use(compression()); //Compress all routes before they are defined
app.use('/', routes); //routes module for the root

/* errors */

// for 404 errors, we should place them as the last route in the stack here. This would catch any routes, as well as catching requests for static resources, if it were defined before those usages are defined above.
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

module.exports = app
