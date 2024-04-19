require('dotenv').config();
module.exports = {
    allowMimeType: ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4', 'image/svg'],
    profile_photo_url: process.env.HOST_URL + '/uploads/profileImages',
    project_photo_url: process.env.HOST_URL + '/uploads/projectImage',
    introduction_photo_url: process.env.HOST_URL + '/uploads/introductionImages',
    broadcast_image_url : process.env.HOST_URL + '/uploads/images',
    broadcast_pdf_url : process.env.HOST_URL + '/uploads/pdf',
    passCode_for_password: 'RSS#RKw2ZH_LT769qaEkWhHH4w.anbyWQvJKuAy@2023',
    image_url: process.env.HOST_URL + 'uploads/images',
    profile_photo_url: process.env.HOST_URL + '/uploads/profileImages',
    item_photo_url: process.env.HOST_URL + '/uploads/itemImages',
    identity_image:  '/uploads/identity',
    jwtAccessTokenOptions: {
        secret: 'RSS#@2023',
        options: {
            algorithm: 'HS256',
            expiresIn: '30d',
            audience: 'aud:Aprodence',
            issuer: 'Aprodence-' + process.env.GIT_BRANCH + '-' + (process.env.NODE_ENV == 'development' ? 'DEV' : 'PROD') + '@' + require('os').hostname()
        }
    },
    jwtRefreshTokenOptions: {
        secret: 'RSS#@2023',
        options: {
            algorithm: 'HS256',
            expiresIn: '30d',
            audience: 'aud:Aprodence',
            issuer: 'Aprodence-' + process.env.GIT_BRANCH + '-' + (process.env.NODE_ENV == 'development' ? 'DEV' : 'PROD') + '@' + require('os').hostname()
        }
    },
}