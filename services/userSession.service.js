const _ =require('lodash');
const db = require('../models');


// Find all roles
const findAll = async () => {
    try {
        const sessions = await db.userSession.findAll({
            attributes: ['session_id', 'expires', 'data']
        });
        return sessions;

    } catch (error) {
        console.log("ERROR AT USER_SESSION.SERVICE -> FINDALL >>> ", error)
    }
};

module.exports = {findAll};