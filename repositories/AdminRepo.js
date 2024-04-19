const sequelize = require('../config/dbConfig').sequelize;
var {DataTypes} = require('sequelize');

const Admin = require('../models/admins')(sequelize,DataTypes);


module.exports.findOne = (where) => {
    return new Promise((resolve, reject) => {
        Admin.findOne({where:{id:1}}).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.count = (where) => {
    return new Promise((resolve, reject) => {
        Admin.count({where:where}).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.update = (where, data, t = null) => {
    return new Promise((resolve, reject) => {
        let options = {
                where: where
            }
            //if trunsaction exist
        if (t != null) options.transaction = t;
        Admin.update(data, options).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err);
        })
    })
}
