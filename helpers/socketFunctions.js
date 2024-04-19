const jwt = require('jsonwebtoken');
;

// const responseMessages = require('../ResponseMessages');
const jwtOptionsAccess = global.constants.jwtAccessTokenOptions;
const sequelize = require('../config/dbConfig').sequelize;
const moment = require('moment');
// get the reference of EventEmitter class of events module
//var events = require('events');
const EventEmitter = require('events');

//create an object of EventEmitter class by using above reference
global.em = new EventEmitter();


module.exports.socketResponse = (socket) => {

    eventEmiter.on('start-meeting', (data) => {
        console.log(data)
        console.log("########################");
        socket.emit("join-meeting", data);

    });




}



