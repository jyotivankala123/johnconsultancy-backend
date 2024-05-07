/*!
 * AuthenticationController.js
 * Containing all the controller actions related to `User`
 * Author: 
 * Date: 21st November, 2023`
 * MIT Licensed
 */
/**
 * Module dependencies.
 * @private
 */

// ################################ Repositories ################################ //

const UserRepositories = require('../../repositories/UserRepo');
const CategoryRepo = require('../../repositories/CategoryRepo');

// ################################ Sequelize ################################ //
const sequelize = require('../../config/dbConfig').sequelize;

// ################################ Response Messages ################################ //
const responseMessages = require('../../ResponseMessages');

// ################################ NPM Packages ################################ //
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const commonFunction = require('../../helpers/commonFunctions');

// ################################ Globals ################################ //
const jwtOptionsAccess = global.constants.jwtAccessTokenOptions;
const jwtOptionsRefresh = global.constants.jwtRefreshTokenOptions;


/*
|------------------------------------------------ 
| API name          :  userRegister
| Response          :  Respective response message in JSON format
| Logic             :  User Registration
| Request URL       :  BASE_URL/api/register
| Request method    :  POST
| Author            :  Jyoti Vankala
|------------------------------------------------
*/

module.exports.userRegister = (req, res) => {
    (async () => {
        let purpose = "User Registration";
        try {
            let body = req.body;
            let userCount = await UserRepositories.count({ phone: body.phone });

            if (userCount == 0) {
                let createData = {
                    full_name: body.full_name,
                    user_cv: body.cv,
                    phone: body.phone,
                    category_id:body.category_id
                }

                let createResponse = await UserRepositories.create(createData);

    
                return res.send({
                    status: 200,
                    msg: responseMessages.registrationSuccess,
                    data: createResponse,
                    purpose: purpose
                })
            }
            else {
                return res.send({
                    status: 409,
                    msg: responseMessages.duplicateEmail,
                    data: {},
                    purpose: purpose
                })
            }
        }
        catch (err) {
            console.log("User Registration Error : ", err);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}

/*
|------------------------------------------------ 
| API name          :  userLogin
| Response          :  Respective response message in JSON format
| Logic             :  User Login
| Request URL       :  BASE_URL/api/login
| Request method    :  POST
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.userLogin = (req, res) => {
    (async () => {
        let purpose = "User Login";
        try {
            let body = req.body;
            let whereData = {
                email: body.email,
                password: md5(body.password),

            }
            let userData = await UserRepositories.findOne(whereData);
            //console.log(userData)

            if (userData) {

        
                if (userData.is_active == '0') {
                    return res.send({
                        status: 403,
                        msg: responseMessages.AdminInactivatedCreds,
                        data: {},
                        purpose: purpose
                    })
                }
                let jwtOptionsAccess = global.constants.jwtAccessTokenOptions;
                let jwtOptionsRefresh = global.constants.jwtRefreshTokenOptions;
                let accessToken = jwt.sign({ user_id: userData.id, email: userData.email }, jwtOptionsAccess.secret, jwtOptionsAccess.options);
                let refreshToken = jwt.sign({ user_id: userData.id, email: userData.email }, jwtOptionsRefresh.secret, jwtOptionsRefresh.options);

                delete userData.password;
                delete userData.otp;
                delete userData.otp_expire_time;


                userData['access_token'] = accessToken;
                userData['refresh_token'] = refreshToken;

            
                return res.send({
                    status: 200,
                    msg: responseMessages.loginSuccess,
                    data: userData,
                    purpose: purpose
                })
            } else {
                return res.send({
                    status: 403,
                    msg: responseMessages.invalidCreds,
                    data: {},
                    purpose: purpose
                })
            }
        } catch (e) {
            console.log("User Login ERROR : ", e);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}


/*
|------------------------------------------------ 
| API name          :  fetchCategories
| Response          :  Respective response message in JSON format
| Logic             :  Get CMS
| Request URL       :  BASE_URL/admin/fetch_cms
| Request method    :  GET
| Author            :  Sayan De
|------------------------------------------------
*/
module.exports.fetchCategories = (req, res) => {
    (async () => {
        let purpose = "Fetch Categories";
        try {
            let body = req.body;

            let categoryList = await CategoryRepo.findAll({})

            return res.send({
                status: 200,
                msg: "Order category listed successfully",
                data: categoryList,
                purpose: purpose
            })

        }
        catch (err) {
            console.log("Fetch CMS Error : ", err);
            return res.send({
                status: 500,
                msg: "Something went wrong",
                data: {},
                purpose: purpose
            })
        }
    })()
}

/*
|------------------------------------------------ 
| API name          :  uploadCV
| Response          :  Respective response message in JSON format
| Logic             :  Get CMS
| Request URL       :  BASE_URL/admin/upload-cv
| Request method    :  GET
| Author            :  Sayan De
|------------------------------------------------
*/
module.exports.uploadUserCV = (req, res) => {
    (async () => {
        let purpose = "Upload Image";
        try {
            let filepath = '';
            let fileExtension = '';
            if (req.file) {

                const filename = req.file.filename;
                fileExtension = filename.split('.').pop();
                if (fileExtension == 'pdf' || fileExtension == 'png' || fileExtension == 'jpg' || fileExtension == 'svg' || fileExtension == 'jpeg') {

                    if (fileExtension == 'pdf') {
                        filepath = `${global.constants.pdf_download_link}/${req.file.filename}`;
                    } else {
                        filepath = `${global.constants.pdf_download_link}/${req.file.filename}`;
                    }

                    if (fileExtension == 'pdf') {
                        fileExtension = 'pdf'
                    } else {
                        fileExtension = 'image'
                    }

                } else {
                    return res.send({
                        status: 409,
                        msg: 'Only PDF and image files are allowed',
                        data: {},
                        purpose: purpose
                    })
                }

            }

            return res.send({
                status: 200,
                msg: 'upload image',
                data: { filepath: filepath, file_type: fileExtension },
                purpose: purpose
            })
        } catch (e) {
            console.log("Upload Image : ", e);
            return res.send({
                status: 500,
                msg: responseMessages.serverError,
                data: {},
                purpose: purpose
            })
        }
    })()
}

