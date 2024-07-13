const _ =require('lodash');
const userSessionService = require('../services/userSession.service')
const asyncMiddleware = require('../middlewares/async');

const toResponse = (session) => {
    let {session_id, expires, data} = _.pick(session, ['session_id', 'expires', 'data']);
    return {
        session_id: session_id,
        expires: expires,
        userID: JSON.parse(data).data.userID,
        username: JSON.parse(data).data.username,
    }
}

// Find all user sessions
const findAll = asyncMiddleware(async (req, res) => {
    try {
        const sessions = await userSessionService.findAll();
        const result = sessions.map((s)=> {
            return toResponse(s);
        })
        res.send(result);
    } catch (error) {
        console.log("ERROR AT USER_SESSION.CONTROLLER -> FINDALL >>> ", error)
    }
});

module.exports = {findAll };