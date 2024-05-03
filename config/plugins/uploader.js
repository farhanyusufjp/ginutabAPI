// PLUGIN
const uploader = {}
const path = require('path')
const multer = require('multer')

const { check, validationResult } = require('express-validator');
// -------------

// PATH UPLOAD
var uploadDriverPhoto = ''
var uploadVehiclePhoto = ''
var uploadApprovedPhoto = ''
var uploadBannerPhoto = ''
// var uploadPathBannerPerpus = ''

// ------------------

const currYear = new Date().getFullYear();


const driverPhoto = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDriverPhoto)
    },
    filename: (req, file, cb) => {
        cb(null, currYear + "~" + "DriverPhoto" + "-" + Date.now() + path.extname(file.originalname))
    }
})
const uploadPhotoDriver = multer({ storage: driverPhoto })
// ----------------------------
const vehiclePhoto = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadVehiclePhoto)
    },
    filename: (req, file, cb) => {
        cb(null, currYear + "~" + "VehiclePhoto" + "-" + Date.now() + path.extname(file.originalname))
    }
})
const uploadPhotoVehicle = multer({ storage: vehiclePhoto })
// ----------------------------
const approvedPhoto = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadApprovedPhoto)
    },
    filename: (req, file, cb) => {
        cb(null, currYear + "~" + "ApprovedPhoto" + "-" + Date.now() + path.extname(file.originalname))
    }
})
const uploadPhotoApproved = multer({ storage: approvedPhoto })
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

uploader.addPhotoDriver = uploadPhotoDriver.single('cover'), uploadDriverPhoto = './public/assets/Driver/'
uploader.addPhotoVehicle = uploadPhotoVehicle.single('cover'), uploadVehiclePhoto = './public/assets/vehicle/'
uploader.addPhotoApproved = uploadPhotoApproved.single('cover'), uploadApprovedPhoto = './public/assets/approvedOrder/'
uploader.addPhotoBanner = uploadPhotoBanner.single('cover'), uploadBannerPhoto = './public/assets/banner/'

// uploader.updateLogoPerpustakaan = uploadLogoPerpus.single('avatar'), uploadPathLogoPerpus = `./public/assets/images/profileLogo`,

// -----------------

module.exports = uploader;