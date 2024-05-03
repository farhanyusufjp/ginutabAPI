// PLUGIN
const uploader = {}
const path = require('path')
const multer = require('multer')

const { check, validationResult } = require('express-validator');
// -------------

// PATH UPLOAD

var uploadBannerPhoto = ''
var uploadArticlePhoto = ''
var uploadTestimoni = ''

// ------------------

const currYear = new Date().getFullYear();

// ----------------------------
const bannerPhoto = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadBannerPhoto)
    },
    filename: (req, file, cb) => {
        cb(null, currYear + "~" + "bannerPhoto" + "-" + Date.now() + path.extname(file.originalname))
    }
})
const uploadPhotoBanner = multer({ storage: bannerPhoto })


const articlePhoto = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadArticlePhoto)
    },
    filename: (req, file, cb) => {
        cb(null, currYear + "~" + "articlePhoto" + "-" + Date.now() + path.extname(file.originalname))
    }
})
const uploadPhotoArticle = multer({ storage: articlePhoto })


const testimoniPhoto = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadTestimoni)
    },
    filename: (req, file, cb) => {
        cb(null, currYear + "~" + "testimoniPhoto" + "-" + Date.now() + path.extname(file.originalname))
    }
})
const uploadPhotoTestimoni = multer({ storage: testimoniPhoto })


uploader.addPhotoBanner = uploadPhotoBanner.single('cover'), uploadBannerPhoto = './public/banner/'
uploader.addPhotoArticle = uploadPhotoArticle.single('cover'), uploadArticlePhoto = './public/article/'
uploader.addPhotoTestimoni = uploadPhotoTestimoni.single('cover'), uploadTestimoni = './public/testimoni/'

// uploader.updateLogoPerpustakaan = uploadLogoPerpus.single('avatar'), uploadPathLogoPerpus = `./public/assets/images/profileLogo`,

// -----------------

module.exports = uploader;