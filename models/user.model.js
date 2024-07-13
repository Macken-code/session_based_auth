const Joi = require("joi");
const jwt = require('jsonwebtoken');
const config = require('config');

const User = (sequelize, DataTypes) => {

    const User = sequelize.define('User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            required: true
        }
        
    });

    User.prototype.generateToken = function(){
        return jwt.sign({id: this.id}, config.get('jwtPrivateKey')) 
    }

    // User.sync({alter: true});
    
    return User;    
}

//validation function
function validateUser(user){

    const schema = Joi.object({
        username: Joi.string().max(50).required(),
        role: Joi.string().max(20).required(),
        password: Joi.string().min(5).max(255).required(),
    })

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;