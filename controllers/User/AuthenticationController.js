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
            let userCount = await UserRepositories.count({ email: body.email });

            if (userCount == 0) {
                let createData = {
                    full_name: body.full_name,
                    email: body.email
                        .toLowerCase(),
                    password: md5(body.password),
                }

                let createResponse = await UserRepositories.create(createData);

        
                delete createResponse.password;
                let accessToken = jwt.sign({ user_id: createResponse.id, email: createResponse.email }, jwtOptionsAccess.secret, jwtOptionsAccess.options);
                let refreshToken = jwt.sign({ user_id: createResponse.id, email: createResponse.email }, jwtOptionsRefresh.secret, jwtOptionsRefresh.options);

                createResponse['access_token'] = accessToken;
                createResponse['refresh_token'] = refreshToken;

            
                // let createNotificationData = {
                //     from_user_id: createResponse.id,
                //     to_user_id: 0,
                //     message: `New user registered as ${createResponse.full_name}`,
                //     read_unread: '0',
                //     type: 'register',
                // };
                // let createNotification = await NotificationRepo.create(createNotificationData);


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

// /*
// |------------------------------------------------ 
// | API name          :  Forgot Password
// | Response          :  Respective response message in JSON format
// | Logic             :  User Login
// | Request URL       :  BASE_URL/api/forgot-password
// | Request method    :  POST
// | Author            :  Jyoti Vankala
// |------------------------------------------------
// */

// module.exports.forgotPassword = (req, res) => {
//     (async () => {
//         let purpose = "Forgot Password"
//         try {
//             let body = req.body;
//             let userDetails = await UserRepositories.findOne({ email: body.email });
//             //console.log(userDetails)
//             if (!userDetails) {
//                 return res.send({
//                     status: 404,
//                     msg: responseMessages.invalidUser,
//                     data: userDetails,
//                     purpose: purpose
//                 })
//             }

//             const otpValue = Math.floor(1000 + Math.random() * 9000);
//             let updateData = await UserRepositories.update({ id: userDetails.id }, { otp: otpValue });


//             if (updateData[0] == 1) {
//                 let currentYear = new Date().getFullYear();
//                 let mailData = {
//                     toEmail: userDetails.email,
//                     subject: '👋 Hola! Este es tu código para restablecer tu contraseña',
//                     // html: `<p>Your OTP is <b>${otpValue}</b></p>`,
//                     html: `<body style="background: #f2f2f2;">
//                     <div style="width:100%; max-width:600px; margin:0 auto; padding:40px 15px;">
                 
//                     <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding:60px 40px;text-align: left; background:#fff;">
//                       <tr>
//                         <th scope="col">
//                         <p style="font-size:17px; font-weight:500; color:#000; line-height:24px;">Hola ${userDetails.full_name},</p>
//                         <p style="font-size:17px; font-weight:500; color:#000; line-height:24px; margin-top: 20px;">Por razones de seguridad y para poder restablecer tu contraseña, deberás utilizar el siguiente código: <strong style="font-size:20px; color:#ff301e;">${otpValue}</strong></p>
//                         <p style="font-size:17px; font-weight:500; color:#000; line-height:24px; margin-top: 20px;">Muchas gracias,</p>
//                         <p style="font-size:17px; font-weight:500; color:#000; line-height:24px;">El equipo de CholloExpress </p>    
                        
//                         </th>
//                       </tr>
//                     </table>
                    
//                     <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding:20px 0;text-align: center; background:#f2f2f2;">
//                       <tr>
//                         <th scope="col">
                        
//                         <p style="font-size:15px; font-weight:500; color:rgb(82, 82, 82); margin-top: 8px;">¿Alguna pregunta o duda?Contáctanos a soporte@cholloexpress.es</p>
//                         <p style="font-size:15px; font-weight:500; color:rgb(82, 82, 82); margin-top: 8px;">Copyright © ${currentYear} ChollExpress. Todos los derechos reservados.</p>
//                         </th>
//                       </tr>
//                     </table>
//                     </div>
//                     </body>`
//                 }
//                 await commonFunction.sendMail(mailData);

//                 return res.send({
//                     status: 200,
//                     msg: responseMessages.otpSendMessgae,
//                     data: {},
//                     purpose: purpose
//                 })
//             }
//             console.log("UPDATE : ", updateData);
//         } catch (e) {
//             console.log("Forgot Password ERROR : ", e);
//             return res.send({
//                 status: 500,
//                 msg: responseMessages.serverError,
//                 data: {},
//                 purpose: purpose
//             })
//         }
//     })()
// }


// /*
// |------------------------------------------------ 
// | API name          :  Reset Password 
// | Response          :  Respective response message in JSON format
// | Logic             :  User Login
// | Request URL       :  BASE_URL/api/reset-password
// | Request method    :  POST
// | Author            :  Jyoti Vankala
// |------------------------------------------------
// */

// module.exports.resetPassword = (req, res) => {
//     (async () => {
//         let purpose = "Reset Password";
//         try {
//             let body = req.body;
//             let userDetails = await UserRepositories.findOne({ otp: body.otp });

//             if (userDetails) {
//                 let updateData = await UserRepositories.update({ id: userDetails.id }, { password: md5(body.password), otp: null });

//                 if (updateData[0] == 1) {
//                     return res.send({
//                         status: 200,
//                         msg: responseMessages.resetPassword,
//                         data: {},
//                         purpose: purpose
//                     })
//                 } else {
//                     return res.send({
//                         status: 500,
//                         msg: responseMessages.serverError,
//                         data: {},
//                         purpose: purpose
//                     })
//                 }
//             } else {
//                 return res.send({
//                     status: 404,
//                     msg: responseMessages.invalidOTP,
//                     data: {},
//                     purpose: purpose
//                 })
//             }
//         } catch (e) {
//             console.log("Reset Password ERROR : ", e);
//             return res.send({
//                 status: 500,
//                 msg: responseMessages.serverError,
//                 data: {},
//                 purpose: purpose
//             })
//         }
//     })()
// }

// /*
// |------------------------------------------------ 
// | API name          :  User Logout
// | Response          :  Respective response message in JSON format
// | Logic             :  User Logout
// | Request URL       :  BASE_URL/api/logout
// | Request method    :  POST
// | Author            :  Jyoti Vankala
// |------------------------------------------------
// */
// module.exports.userLogout = (req, res) => {
//     (async () => {
//         let purpose = "Logout";
//         try {
//             let userID = req.headers.userID;
//             let body = req.body;
//             let userDetails = await UserFcmTokenRepositories.findUserTokens({ user_id: userID });

//             if (!userDetails) {
//                 return res.send({
//                     status: 404,
//                     msg: responseMessages.invalidUser,
//                     data: {},
//                     purpose: purpose
//                 })
//             }

//             await UserFcmTokenRepositories.update({ user_id: userID }, { fcmToken: null });

//             return res.send({
//                 status: 200,
//                 msg: responseMessages.logout,
//                 data: {},
//                 purpose: purpose
//             })
//         }
//         catch (err) {
//             console.log("Logout Error : ", err);
//             return res.send({
//                 status: 500,
//                 msg: responseMessages.serverError,
//                 data: {},
//                 purpose: purpose
//             })
//         }
//     })()
// }

// /*
// |------------------------------------------------ 
// | API name          :  Delete User
// | Response          :  Respective response message in JSON format
// | Logic             :  Delete User
// | Request URL       :  BASE_URL/api/delete-account
// | Request method    :  DELETE
// | Author            :  Jyoti Vankala
// |------------------------------------------------
// */
// module.exports.deleteAccount = (req, res) => {
//     (async () => {
//         let purpose = "Delete Account";
//         try {
//             let userID = req.headers.userID;

//             await UserRepositories.delete({ id: userID });

//             let notification = await NotificationRepo.findAll({from_user_id:userID})

//             if(notification){
//                 for(let notId of notification){
//                     await NotificationRepo.delete({id: notId.id});            
//                 }
//             }
        
//             return res.send({
//                 status: 200,
//                 msg: responseMessages.deleteAccount,
//                 data: {},
//                 purpose: purpose
//             })
//         }
//         catch (err) {
//             console.log("Delete User Error : ", err);
//             return res.send({
//                 status: 500,
//                 msg: responseMessages.serverError,
//                 data: {},
//                 purpose: purpose
//             })
//         }
//     })()
// }

