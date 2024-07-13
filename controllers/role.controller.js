const _ =require('lodash');
const roleService = require('../services/role.service')
const validate = require('../models/role.model').validate;
const asyncMiddleware = require('../middlewares/async');

// saving new role
const save = asyncMiddleware(async (req, res) => {
    
    try {
        // verify if req.body is valid
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        // getting req.body
        const {role} = req.body;

        // is role exist?
        let existedRole = await roleService.isExist(role);
        if(existedRole) return res.status(400).json({"error_message": "Role already existed"});

        // saving role
        let savedRole = await roleService.save(role);
        if(!savedRole) return res.status(400).json({"error_message": "Role not saved"});

        res.send(_.pick(savedRole, ['id', 'role'])); 
    } catch (error) {
        console.log("ERROR AT ROLE.CONTROLLER -> SAVE >>> ", error)
    }
});

// Find all roles
const findAll = asyncMiddleware(async (req, res) => {
    try {
        const roles = await roleService.findAll();
        res.send(roles);
    } catch (error) {
        console.log("ERROR AT ROLE.CONTROLLER -> FINDALL >>> ", error)
    }
});

module.exports = { save, findAll };