const Joi = require("joi");

const UserSession = (sequelize, DataTypes) => {

    const UserSession = sequelize.define('UserSession', {
        session_id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        expires: {
            type: DataTypes.INTEGER
        },
        data: {
            type: DataTypes.STRING
        }       
    }, {  
        tableName: 'user_session' 
    });

    // User.sync({alter: true});
    
    return UserSession;    
}

exports.UserSession = UserSession;