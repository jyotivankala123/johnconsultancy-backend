require("dotenv").config();
const nodemailer = require("nodemailer");
const request = require("request");
const axios = require('axios');

// ################################ Configurations ################################ //
// const transportOptions = {
//   host: process.env.MAIL_HOST,
//   port: process.env.MAIL_PORT,
//   auth: {
//     user: process.env.MAIL_USERNAME,
//     pass: process.env.MAIL_PASSWORD,
//   },
// };

// Send Mail
// module.exports.sendMail = (messageData) => {
//   return new Promise((resolve, reject) => {
//     const mailTransport = nodemailer.createTransport(transportOptions);
//     const message = {
//       from: `${process.env.MAIL_FROM}<${process.env.MAIL_FROM_ADDRESS}>`, // Sender address
//       to: messageData.toEmail, // List of recipients
//       subject: messageData.subject, // Subject line
//       html: messageData.html, // Html text body
//     };

//     mailTransport.sendMail(message, function (err, info) {
//       if (err) {
//         console.log("MAIL ERROR : ", err);
//         reject(err);
//       } else {
//         console.log("INFO : ", info);
//         resolve(true);
//       }
//     });
//   });
// };


// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'jyoti.aprodence@gmail.com',
    pass: 'oxxk zque hapf wpdy', // Use the App Password you generated
  },
});

// Send Mail
module.exports.sendMail = (messageData) => {
  return new Promise((resolve, reject) => {
    const message = {
      from: `${process.env.MAIL_FROM}<${process.env.MAIL_FROM_ADDRESS}>`, // Sender address
      to: messageData.toEmail, // List of recipients
      subject: messageData.subject, // Subject line
      html: messageData.html, // Html text body
    };

    transporter.sendMail(message, function (err, info) {
      if (err) {
        console.log("MAIL ERROR : ", err);
        reject(err);
      } else {
        console.log("INFO : ", info);
        resolve(true);
      }
    });
  });
};


module.exports.thirdPartApi = (data) => {
  return new Promise((resolve, reject) => {
    (async () => {
      try{
       
        let config =  {
          method: 'get',
          uri: data.url,
        }
        console.log('config',config)
        const response = await axios(data);
           console.log('response',response);
            resolve(response);
        
      }
      catch(err){
        console.error('errr sdsadsd===============================================================',data.id);
        resolve(true)
      }
    
     })();
  });
};


module.exports.isImageUrlValid = async (imageUrl) => {
  try {
    const response = await axios.head(imageUrl);

    return response.status >= 200 && response.status < 300;
      } catch (error) {
    return false;
  }
};




// module.exports.thirdPartApi = (config) => {
//   return new Promise((resolve, reject) => {
//     (async () => {
//       let incidents = []
//       console.log(config)
//       request(
//         {
//           method: "get",
//           uri: config.url,
         
//         },
//         async function (error, response, body) {
//           if (error) {
//             console.log('error with api call');
//             resolve(true);
//           }
//           const data = response;
//          // const apiData = JSON.parse(data);
//           if (data) {
//             //console.log(data);
//             // let data = data;

//             resolve(false);

//           } else {
//             console.log("error with api call");
//             resolve(true);
//           }
//         }
//       );
//     })();
//   });
// };

