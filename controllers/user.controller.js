const bcrypt = require('bcrypt');
const _ =require('lodash');
const userService = require('../services/user.service');
const roleService = require('../services/role.service');
const validate = require('../models/user.model').validate;
const db = require('../models');
const asyncMiddleware = require('../middlewares/async');

// saving new user
const save = asyncMiddleware(async (req, res) => {
    
    // verify if req.body is valid
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {username, password, role} = req.body;

    // is user exist?
    let isUserExist = await userService.isExist(username);
    if(isUserExist) return res.status(400).send({"error-message": "user already exist"});

    const userToCreate = {
        username: username
    }

    const salt = await bcrypt.genSalt(10);
    userToCreate.password = await bcrypt.hash(password, salt);
    
    let createdUser = await userService.save(userToCreate);
    const existedRole = await roleService.findByName(role);
    if(!existedRole) return res.status(400).send({"error-message": "role not exist"});
    await createdUser.setRole(existedRole);

    createdUser = await userService.findById(createdUser.id);

    res.send(_.pick(createdUser, ['id', 'username'])); 
});

// Get connected  user
const getMe = async (req, res) => {
    try {

        if(!req.session.data.userID) {
            return res.status(403).send(`Access denied`);
        }
        let user = await userService.findByUsername(req.session.data.username);
        if(!user) return res.status(404).send(`The user with the given ID: ${req.user.id} was not found`);
        res.send(_.pick(user, ['id', 'username']));
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message || 'Some error'
        });
    }
}

module.exports = { save, getMe };