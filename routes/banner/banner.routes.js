var express = require('express');
var router = express.Router();
const banner = require('../../controllers/banner/banner.controller')
const authentication = require('../../middleware/private.middleware')
const plugins = require('../../plugins/uploader')



router.get('/get-banner-home', banner.getBannerHome);
router.post('/add-banner-home', authentication, plugins.addPhotoBanner, banner.uploadBannerHome);


module.exports = router;
