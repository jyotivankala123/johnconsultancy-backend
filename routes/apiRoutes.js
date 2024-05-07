const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const router = express.Router();


// SET STORAGE Images
var storageReportImages = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = 'uploads/images';
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, 'file-' + Date.now() + path.extname(file.originalname))
    }
})




var uploadReportImage = multer({ storage: storageReportImages });

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
router.get('/fetch-categories',  AuthenticationController.fetchCategories); // Fetch Categories
router.post('/upload-cv',uploadReportImage.single('file'),  AuthenticationController.uploadUserCV); // Upload CV




module.exports = router;