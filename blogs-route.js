/* blogs-route.js: Blog route module */

const express = require('express');
const app = express()
const router = express.Router();

router.get('/', function(req, res) {
  res.render('blogs',
  {title : 'Blogs', content: 'This route is handled in a custom module.'})
});

module.exports = router;
