const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();


// SET STORAGE Images
var storageIntroductionImages = multer.diskStorage({
    destination: function(req, file, cb) {
        const path = 'uploads/introductionImages';
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: function(req, file, cb) {
        cb(null, 'introduction-image-' + Date.now() + path.extname(file.originalname))
    }
})


var uploadIntroductionImage = multer({ storage: storageIntroductionImages });

// SET STORAGE Images
var storageProfileImages = multer.diskStorage({
    destination: function(req, file, cb) {
        const path = 'uploads/profileImages';
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: function(req, file, cb) {
        cb(null, 'profile-image-' + Date.now() + path.extname(file.originalname))
    }
})


var uploadProfileImage = multer({ storage: storageProfileImages });




/* ############################################ Middlewares ############################################ */
const validateRequest = require('../middlewares/ValidateRequest');
const authenticationMiddleware = require('../middlewares/AuthenticationMiddleware');


/* ############################################ Joi Validation Schema ############################################ */
const adminValidationSchema = require('../validation-schemas/Admin/AdminSchemas');

/* ############################################ Controllers ############################################ */
const AuthenticationController= require('../controllers/Admin/AuthenticationController');


/* ##################################################### Routes  ################################################## */

router.post('/login', validateRequest.validate(adminValidationSchema.loginSchema, 'body'), AuthenticationController.login); // Admin Login Route

module.exports = router;