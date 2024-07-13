const _ =require('lodash');
const db = require('../models');

// saving new role
const save = async (role) => {
    
    try {
        // is role exist?
        let existedRole = await db.role.findOne({ 
            where: {role: role} 
        })
        if(existedRole) return null;

        const savedRole = await db.role.create({
            role: role
        });
        if(!savedRole) return null;
        return savedRole;

    } catch (error) {
        console.log("ERROR AT ROLE.SERVICE -> SAVE >>> ", error)
    }    
};

// Find all roles
const findAll = async () => {
    try {
        const roles = await db.role.findAll({
            attributes: ['id', 'role']
        });
        return roles;

    } catch (error) {
        console.log("ERROR AT ROLE.SERVICE -> FINDALL >>> ", error)
    }
};

//Get a role by name
const findByName = async (roleParam) => {
    try {
        const role = await db.role.findOne({
            attributes: ['id', 'role'],
            where: {role: roleParam}
        });

        if(!role) return null;
        return role;

    } catch (error) {
        console.log("ERROR AT ROLE.SERVICE -> FINDBYNAME >>> ", error)
    }
};

//Get a role by id
const findByID = async (id) => {
    try {
        const role = await db.role.findOne({
            attributes: ['id', 'role'],
            where: {id: id}
        });

        if(!role) return null;
        return role;

    } catch (error) {
        console.log("ERROR AT ROLE.SERVICE -> FINDBYID >>> ", error)
    }
};

// is exist by role
const isExist = async (name) => {
    return new Promise(async (resolve, reject) => {
        try {
            const role = await db.role.findOne({
                where: {role: name}
            });
            if(role) resolve(true);
            else resolve(false);

        } catch (error) {
            console.log("ERROR AT ROLE.SERVICE -> ISEXIST >>> ", error)
        }
    })
};

// Update a rol
const _update = async (role, id) => {
    try {
        // if role not exist return null
        let existedRole = await db.role.findOne({ 
            where: {id: id} 
        })
        if(!existedRole) return null;

        // if role not modified return 0
        const roleToModify = _.pick(role, ['role']);
        const updatedRole = await db.role.update(roleToModify, {
            where: {
                id: existedRole.id
            }
        });
        if(updatedRole == 0) return 0;

        // else return the modified role
        let modifiedRole = await db.role.findOne({ 
            where: {id: existedRole.id}
        })

        return modifiedRole;
        
    } catch (error) {
        console.log("ERROR AT ROLE.SERVICE -> _UPDATE >>> ", error)
    }

};

// Delete a role by id
const _delete = async (roleP) => {
    try {
        const { id: roleID } = roleP;

        const role = await db.role.findByPk(roleID);
        if (!role) return null;
        await db.role.destroy({
            where: {
                id: roleID
            }
        });
        return role;
    } catch (error) {
        console.log("ERROR AT DELETE ROLE", error);
    }
    
};

module.exports = { save, findAll, findByName, findByID, _update, isExist, _delete};