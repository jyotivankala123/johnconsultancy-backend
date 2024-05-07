const sequelize = require('../config/dbConfig').sequelize;
var {DataTypes} = require('sequelize');

const Categories = require('../models/categories')(sequelize,DataTypes);


module.exports.findOne = (where) => {
    return new Promise((resolve, reject) => {
        Categories.findOne({where:where}).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

module.exports.count = (where) => {
    return new Promise((resolve, reject) => {
        Categories.count({where:where}).then(result => {
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
        Categories.update(data, options).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err);
        })
    })
}


// create
module.exports.create = (data) => {

    return new Promise((resolve, reject) => {
        Categories.create(data).then(result => {
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
        Categories.destroy({where: where}).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}

//find And Count All Categories
module.exports.findAndCountAll = (whereData, data) => {
    return new Promise((resolve, reject) => {
        Categories.findAndCountAll({
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


//find And Count All Categories
module.exports.findAll = (whereData, data) => {
    return new Promise((resolve, reject) => {
        Categories.findAll({
            where: whereData,
          
        }).then(result => {
            result = JSON.parse(JSON.stringify(result).replace(/\:null/gi, "\:\"\""));
            resolve(result);
        }).catch((error) => {
            reject(error);
        })
    })
}