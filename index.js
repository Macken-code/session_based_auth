const winston = require('winston');
const config = require('config');
const express = require('express');
const app = express();


require('./startup/routes')(app);

winston.add(winston.transports.File, {filename: 'logfile.log'})

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}
if(!config.get('db')){
    console.error('FATAL ERROR: database configuration is not defined.');
    process.exit(1);
}

const PORT = process.env.PORT || 3010;
console.log("PORT ==>>> ", PORT);
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));

