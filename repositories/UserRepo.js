const sequelize = require('../config/dbConfig').sequelize;
var {DataTypes} = require('sequelize');

const Users = require('../models/users')(sequelize,DataTypes);


module.exports.findOne = (where) => {
    return new Promise((resolve, reject) => {
        Users.findOne({where:where}).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.count = (where) => {
    return new Promise((resolve, reject) => {
        Users.count({where:where}).then(result => {
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
        Users.update(data, options).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err);
        })
    })
}


// create
module.exports.create = (data) => {

    return new Promise((resolve, reject) => {
        Users.create(data).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}


// delete
module.exports.delete = (where) => {
    return new Promise((resolve, reject) => {
        Users.destroy({where: where}).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//find And Count All Users
module.exports.findAndCountAll = (whereData, data) => {
    return new Promise((resolve, reject) => {
        Users.findAndCountAll({
            where: whereData,
            limit: data.limit,
            offset: data.offset,
            order: [['createdAt', 'desc']],
        }).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}
