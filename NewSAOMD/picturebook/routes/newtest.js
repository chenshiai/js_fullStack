var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/test1', function(req, res, next) {
  res.send('这里是test1！');
});

router.get('/test2', function(req, res, next) {
  res.send('这里是test2！');
});

module.exports = router;
