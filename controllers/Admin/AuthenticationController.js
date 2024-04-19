/*!
 * AdminController.js
 * Containing all the controller actions related to `Admin`
 * Author: 
 * Date: 20th November, 2023`
 * MIT Licensed
 */
/**
 * Module dependencies.
 * @private
 */ 
 
// ################################ Repositories ################################ //
// const sharp = require('sharp');
const adminRepositories = require('../../repositories/AdminRepo');
// const NotificationRepo = require('../../repositories/NotificationsRepo');

// ################################ Sequelize ################################ //
const sequelize = require('../../config/dbConfig').sequelize;

// ################################ Response Messages ################################ //
const responseMessages = require('../../ResponseMessages');

// ################################ NPM Packages ################################ //
const md5 = require('md5');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

 
// ################################ Globals ################################ //
const jwtOptionsAccess = global.constants.jwtAccessTokenOptions;
const jwtOptionsRefresh = global.constants.jwtRefreshTokenOptions;

/*
|------------------------------------------------ 
| API name          :  adminLogin
| Response          :  Respective response message in JSON format
| Logic             :  Admin Login
| Request URL       :  BASE_URL/admin/login
| Request method    :  POST
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
module.exports.login = (req, res) => {
    (async() => {
        let purpose = "Admin Login";
        try {
            let body = req.body;
            let whereData = {
                email: body.email,
                password: md5(body.password),
            }
            let userData = await adminRepositories.findOne(whereData);

            if (userData) {

                let accessToken = jwt.sign({ user_id: userData.id, email: userData.email }, jwtOptionsAccess.secret, jwtOptionsAccess.options);
                let refreshToken = jwt.sign({ user_id: userData.id, email: userData.email }, jwtOptionsRefresh.secret, jwtOptionsRefresh.options);

                delete userData.password;
                delete userData.otp;
                delete userData.otp_expire_time;
                
                userData['access_token'] = accessToken;
                userData['refresh_token'] = refreshToken;

                return res.status(200).send({
                    status: 200,
                    msg: responseMessages.adminLoginSuccess,
                    data: userData,
                    purpose: purpose
                })
            } else {
                return res.status(403).send({
                    status: 403,
                    msg: responseMessages.adminInvalidCred,
                    data: {},
                    purpose: purpose
                })
            }
        } catch (e) {
            console.log("Admin Login ERROR : ", e);
            return res.status(500).send({
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
| API name          :  userDetails
| Response          :  Respective response message in JSON format
| Logic             :  User Details
| Request URL       :  BASE_URL/api/profile-details
| Request method    :  GET
| Author            :  Jyoti Vankala
|------------------------------------------------
*/
// module.exports.profileDetails = (req, res) => {
//     (async()=>{
//         let purpose = "Profile Details";
//         try { 
//             let userID = req.headers.userID;
//             let userDetails = await adminRepositories.findOne({ id: 1 });

//             userDetails.notificationCount = await NotificationRepo.count({read_unread:'0'})
       
    
//             delete userDetails.password;
//             delete userDetails.otp;

//             return res.send({
//                 status: 200,
//                 msg: responseMessages.profileDetails,
//                 data: userDetails,
//                 purpose: purpose
//             })
            
//         }
//         catch(err) {
//             console.log("Pofile Details Error : ", err);
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
// | API name          :  updateProfile
// | Response          :  Respective response message in JSON format
// | Logic             :  Update User Profile
// | Request URL       :  BASE_URL/api/update-user-profile
// | Request method    :  POST
// | Author            :  Jyoti Vankala
// |------------------------------------------------
// */
// module.exports.updateProfile = (req, res) => {
//     (async()=> {
//         let purpose = "Update User Profile";
//         try {
//             let userID = req.headers.userID;
//             let body = req.body;
//             let userCount = await adminRepositories.count({ id: userID });
//             if(userCount == 0) {
//                 return res.send({
//                     status: 404,
//                     msg: responseMessages.invalidUser,
//                     data: {},
//                     purpose: purpose
//                 })
//             } 
//             if(userCount > 0) {
//                 let updateData = {
//                     full_name: body.full_name,
//                     phone: body.phone,
//                     email: body.email,
//                     phone: body.phone,
//                     address: body.address
//                 }

//               await adminRepositories.update({ id: userID }, updateData);
//             }

//             return res.send({
//                 status: 200,
//                 msg: responseMessages.userProfileUpdate,
//                 data: {},
//                 purpose: purpose
//             })
//         }
//             catch(err) {
//                 console.log("Profile Update Error : ", err);
//                 return res.send({
//                     status: 500,
//                     msg: responseMessages.serverError,
//                     data: {},
//                     purpose: purpose
//                 })
//             }
//         })()
// }


// /*
// |------------------------------------------------ 
// | API name          :  profileImageUpdate
// | Response          :  Respective response message in JSON format
// | Logic             :  Update Profile Image
// | Request URL       :  BASE_URL/api/update-profile-image
// | Request method    :  PUT
// | Author            :  Jyoti Vankala
// |------------------------------------------------
// */
// module.exports.profileImageUpdate = (req, res) => {
//     (async()=>{
//         let purpose = "Update Profile Image";
//         try {
//             let userID = req.headers.userID;
//             let profileImage = '';

//             if(req.file) {
//               profileImage = `${global.constants.profile_photo_url}/${req.file.filename}`;
//             }

//             await  adminRepositories.update({ id: userID }, { profile_image: profileImage});
            
//             return res.send({
//                 status: 200,
//                 msg: responseMessages.adminProfileImageUpdate,
//                 data: profileImage,
//                 purpose: purpose
//             })

//         }
//         catch(err) {
//             console.log("Image Profile ERROR : ", err);
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
// | API name          :  changePassword
// | Response          :  Respective response message in JSON format
// | Logic             :  User Details
// | Request URL       :  BASE_URL/api/change-password
// | Request method    :  PATCH
// | Author            :  Jyoti Vankala
// |------------------------------------------------
// */
// module.exports.changePassword = (req, res) => {
//     (async()=>{
//         let purpose = "Change Password";
//         try {
//             let userID = req.headers.userID;
//             let body = req.body;

//             let userDetails = await adminRepositories.findOne({ id: userID });

//             if (userDetails) { 
//                 await adminRepositories.update({ id: userDetails.id }, { password: md5(body.new_password) });
//                 return res.send({
//                     status: 200,
//                     msg: responseMessages.adminChangePassword,
//                     data: {},
//                     purpose: purpose
//                 })
//             }
//             else {
//                 return res.send({
//                     status: 409,
//                     msg: responseMessages.userNotFound,
//                     data: {},
//                     purpose: purpose
//                 })
//             }
//         }
//         catch(err) {
//             //console.log("Change Password ERROR : ", err);
//             return res.send({
//                 status: 500,
//                 msg: responseMessages.serverError,
//                 data: {},
//                 purpose: purpose
//             })
//         }
//     })()
// }