var express = require('express');
var router = express.Router();
const testimoni = require('../../controllers/testimoni/testimoni.controller')
const authentication = require('../../middleware/private.middleware')
const plugins = require('../../plugins/uploader')



// router.get('/get-banner-home', banner.getBannerHome);
router.post('/add-testimoni', authentication, plugins.addPhotoTestimoni, testimoni.addTestimoni);
router.get('/get-testimoni', testimoni.getTestimoni);
router.get('/get-testimoni-detail', authentication, testimoni.TestimoniDetail);
router.post('/edit-testimoni', authentication, plugins.addPhotoTestimoni, testimoni.editTestimoni);
router.post('/del-testimoni', authentication, testimoni.deleteTestimoni);


module.exports = router;
