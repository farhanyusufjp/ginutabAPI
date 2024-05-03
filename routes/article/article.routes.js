var express = require('express');
var router = express.Router();
const article = require('../../controllers/article/article.controller')
const authentication = require('../../middleware/private.middleware')
const plugins = require('../../plugins/uploader')



// router.get('/get-banner-home', banner.getBannerHome);
router.post('/add-article', authentication, plugins.addPhotoArticle, article.addArticle);
router.get('/get-article', article.getArticle);
router.get('/get-article-detail', authentication, article.articleDetail);
router.post('/edit-article', authentication, plugins.addPhotoArticle, article.editArtcile);
router.post('/delete-article', authentication, article.deleteArticle);



module.exports = router;
