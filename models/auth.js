const bcrypt = require('bcrypt');
const Joi = require("joi");
const _ =require('lodash');
const userService = require('../services/user.service');

// saving new user
const signIn = async (req, res) => {

    // verify if req.body is valid
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const {username, password} = req.body;
    
    // is user exist?
    let user = await userService.findByUsername(username);
    if(!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    req.session.data = {userID: user.id, username: user.username};
    res.send(_.pick(user, ['id','username'])); 

}

//validation function
function validate(user){
    const schema = Joi.object({
        username: Joi.string().min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
}

module.exports = { signIn };