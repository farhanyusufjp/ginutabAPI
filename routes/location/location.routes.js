var express = require('express');
var router = express.Router();
const location = require('../../controllers/location/location.controller')
const authentication = require('../../middleware/private.middleware')
const plugins = require('../../plugins/uploader')



router.get('/get-select-location', location.getSelect);
router.post('/add-location', authentication, location.addLocation);
router.get('/get-location', location.getLocation);



module.exports = router;
