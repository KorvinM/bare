/* wiki-route.js: Wiki route module */

const express = require('express');
const app = express()
const router = express.Router();

router.get('/', function(req, res) {
  res.render('wiki',
  {title : 'Wiki', content: 'This route is handled in a custom module.'})
});

// About page route
router.get('/about', function(req, res) {
  res.render('wiki-about',
  {title : 'About this Wiki', content: 'This route is handled in a custom module'})
});

module.exports = router;
