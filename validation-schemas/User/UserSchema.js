const JoiBase = require("joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

// Create User Schema
module.exports.userRegisterSchema = Joi.object().keys({
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(6)
        // .regex(/(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}/)
        .required(),
    // .messages({
    //     'string.pattern.base': `"Password" should be Alphanumeric `,
    // }),
    confirm_password: Joi.string().valid(Joi.ref('password')).required()
        .messages({
            'any.only': `"Confirm Password" should match with "Password"`
        }),
}).with('password', 'confirm_password');

// Login Schema
module.exports.userLoginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
});


// Forgot Password Schema
module.exports.forgotPassSchema = Joi.object().keys({
    email: Joi.string().email().required(),
}); 

// OTP Verification Schema
module.exports.otpVerificationSchema = Joi.object().keys({
    otp: Joi.string().required(),
    email: Joi.string().email().required()
});

// Reset Password Schema
module.exports.resetPassSchema = Joi.object().keys({
    password: Joi.string().required().min(6),
    confirm_password: Joi.string().equal(Joi.ref('password')).required().messages({
        'any.only': `Confirm Password should match with Password`,
    }), //Confirm password must be same as password
    otp: Joi.string().required()
});

// Social Login Schema
module.exports.socialRegisterationSchema = Joi.object().keys({
    full_name: Joi.string().required(),
    email: Joi.string().required(),
    login_type: Joi.string().valid('linkedIn', 'google').required(),
    providerId: Joi.string().required(),
    user_type:Joi.string().required(),
});


//Forget password
module.exports.forgetPasswordSchema = Joi.object().keys({
    email: Joi.string().email().required().messages({ 'any.required': `"Email" is a required field` }),
});

//Reset password
module.exports.resetPasswordSchema = Joi.object().keys({
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.min': `"Password" should have a minimum length of 6 charecters`,
        }),
    confirm_password: Joi.string().valid(Joi.ref('password')).required()
        .messages({
            'any.only': `"Confirm Password" should match with "Password"`
        }),
    otp: Joi.number().required()
        .messages({
            'any.required': `"OTP" is a required field`,
            'number.base': `"OTP" must be a number`
        })
}).with('password', 'confirm_password');



// Intro Schema
module.exports.introSchema = Joi.object().keys({
    intro_number: Joi.string().required(),
});

// Change Pass Schema
module.exports.changePassSchema = Joi.object().keys({

    new_password: Joi.string()
        .min(6)
        // .regex(/(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}/)
        .required(),
        // .messages({
        //     'string.pattern.base': `"Password" should be Alphanumeric `,
        // }),
    confirm_password: Joi.string().valid(Joi.ref('new_password')).required()
        .messages({
            'any.only': `"Confirm Password" should match with "Password"`
        }),
}).with('new_password', 'confirm_password');


// Update User Schema
module.exports.updateUserProfileSchema = Joi.object().keys({
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().allow(null, ''),
})


// Product Schema
module.exports.productListSchema = Joi.object().keys({
    search: Joi.string().allow(null, ''),
    date: Joi.string().allow(null, ''),
    page: Joi.string().required(),
})

// Wishlist Schema
module.exports.wishlistSchema = Joi.object().keys({
    page: Joi.string().required(),
})

// Wishlist Schema
module.exports.addToSchema = Joi.object().keys({
    item_id: Joi.string().required(),
})


// CMS  Schema
module.exports.cmsSchema = Joi.object().keys({
    type: Joi.string().required(),
})

