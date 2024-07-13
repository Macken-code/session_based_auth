const Joi = require("joi");

const Role = (sequelize, DataTypes) => {

    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }       
    });

    // User.sync({alter: true});
    
    return Role;    
}

//validation function
function validateRole(role){

    const schema = Joi.object({
        role: Joi.string().max(50).required()
    })

    return schema.validate(role);
}

exports.Role = Role;
exports.validate = validateRole;