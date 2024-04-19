const JoiBase = require("joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

module.exports.loginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
});


// Update CMS Schema
module.exports.updateCmsSchema = Joi.object().keys({
    page_name: Joi.string().required(),
    content: Joi.string().required()
});

// Get CMS Schema
module.exports.getCmsSchema = Joi.object().keys({
    page_name: Joi.string().required()
});  

// Links List Schema
module.exports.rssLinksList = Joi.object().keys({
    page: Joi.string().required(),
    invalidLinkpage: Joi.string().required()
});  

// Items List Schema
module.exports.rssLinksItems = Joi.object().keys({
    id: Joi.string().required(),
    page: Joi.string().required()
});  

// Links Add Schema
module.exports.rssLinksCreate = Joi.object().keys({
    rss_link: Joi.string().required()
});  


// Introduction Update Schema
module.exports.introductionUpdate = Joi.object().keys({
  
    introduction_title: Joi.string().required(),
    introduction_description: Joi.string().required(),
    image: Joi.string().allow(null, ''),
});  

// Status Change
module.exports.statusChange = Joi.object().keys({
    status: Joi.string().required(),
});  

// Update User Schema
module.exports.updateUserProfileSchema = Joi.object().keys({
    full_name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    address:Joi.string().required(),
    email:Joi.string().required(),
})



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
