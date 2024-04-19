const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();


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
const validateRequest = require("../middlewares/ValidateRequest");
const authenticationMiddleware = require('../middlewares/AuthenticationMiddleware');


/* ############################################ Joi Validation Schema ############################################ */
const userValidationSchema = require('../validation-schemas/User/UserSchema');
 
/* ############################################ Controllers ############################################ */
const AuthenticationController = require('../controllers/User/AuthenticationController');



// ############################################# AUTH ################################################### //
router.post('/register', validateRequest.validate(userValidationSchema.userRegisterSchema, 'body'), AuthenticationController.userRegister); // User Registration Route
router.post('/login', validateRequest.validate(userValidationSchema.userLoginSchema, 'body'), AuthenticationController.userLogin); // User Login
// router.post('/forgot-password', validateRequest.validate(userValidationSchema.forgotPassSchema, 'body'), AuthenticationController.forgotPassword); // Forgot Password Route
// router.post('/reset-password', validateRequest.validate(userValidationSchema.resetPassSchema, 'body'), AuthenticationController.resetPassword); // Reset Password Route
// router.delete('/delete-account',  authenticationMiddleware.authenticateRequestAPI, AuthenticationController.deleteAccount); // Delete User Route

module.exports = router;