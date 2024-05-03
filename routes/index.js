var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'asd' });
});

router.use('/product', require('./product/product.routes'))
router.use('/auth', require('./auth/auth.routes'))
router.use('/banner', require('./banner/banner.routes'))
router.use('/article', require('./article/article.routes'))
router.use('/testimoni', require('./testimoni/testimoni.routes'))

module.exports = router;
