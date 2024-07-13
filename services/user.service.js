const _ =require('lodash');
const db = require('../models');

// saving new user
const save = async (userTosave) => {
    
    try {

        // verify if user exist
        const existedUser = await isExist(userTosave.username);
        if(existedUser) return null;

        const createdUser = await db.user.create(userTosave);
        if(!createdUser) return null;
        return createdUser;

    } catch (error) {
        console.log("ERROR AT USER.SERVICE -> SAVE >>> ", error);
    }    
};

// Find all users
const findAll = async () => {
    try {

    } catch (error) {
        console.log("ERROR AT USER.SERVICE -> FINDALL >>> ", error);
    }
};

//Get a user by name
const findByUsername = async (username) => {
    try {
        const user = await db.user.findOne({
            where: {username: username}
        });

        if(!user) return null;
        return user;
    } catch (error) {
        console.log("ERROR AT USER.SERVICE -> FINDBYNAME >>> ", error);
    }
};

//Get a user by id
const findById = async (id) => {
    try {
        const user = await db.user.findOne({
            where: {id: id},
            attributes: {exclude: ['password']},
            include: [{
                model: db.role,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }]
        });

        if(!user) return null;
        return user;
    } catch (error) {
        console.log("ERROR AT USER.SERVICE -> FINDBYID >>> ", error);
    }
};

// is exist by name
const isExist = async (username) => {
    console.log("DEBUG -> ", username);
    return new Promise(async (resolve, reject) => {
        try {
            const existedUser = await db.user.findOne({
                where: {username: username}
            });
            if(existedUser) resolve(true);
            else resolve(false);

        } catch (error) {
            console.log("ERROR AT USER.SERVICE -> ISEXIST >>> ", error)
        }
    })
};

// Update an accessory
const _update = async (toModify) => {
    try {
        
    } catch (error) {
        console.log("ERROR AT USER.SERVICE -> UPDATE >>> ", error);
    }
};

module.exports = { save, findAll, findByUsername, _update, findById, isExist};