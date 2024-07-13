const winston = require('winston');
// Database connection failed
const dbConnectionFailed = (err, res) => {
    // console.error('ERROR-MESSAGE: ', err.message);
    winston.error(err.message)
    console.error('ERROR-CAUSE: Cannot connect to the database verify if database up...');
    res.status(500).send({
        server_error_message: err.message || 'Some error',
        custom_error_message: 'Cannot connect to the database verify if database up...'
    });
}

const primaryConstraint = (err, res) => {
    console.error('ERROR-MESSAGE: ', err);
    // winston.error(err.message)
    // console.error('ERROR-CAUSE: Cannot create existed row...');
    res.status(500).send({
        server_error_message: err.message || 'Some error',
        custom_error_message: 'Cannot create existed row...',
        existed_code: err.errors[0].value
    });
}

const foreignKeyConstraint = (err, res) => {
    // console.error('ERROR-MESSAGE: ', err.message);
    winston.error(err.message)
    console.error('ERROR-CAUSE: Cannot create ...');
    res.status(500).send({
        server_error_message: err.message || 'Some error',
        custom_error_message: `The ${err.table} with the given code : ${err.value} was not found`
    });
}

module.exports = function(err, req, res, next){

    if (err.name === 'SequelizeConnectionRefusedError' && err.original.code === 'ECONNREFUSED') {
        dbConnectionFailed(err, res);
    }

    if (err.name === 'SequelizeUniqueConstraintError' || err.original.code === 'ER_DUP_ENTRY') {
        primaryConstraint(err, res);
    }
    
    if (err.name === 'SequelizeForeignKeyConstraintError' || err.original.code === 'ER_NO_REFERENCED_ROW_2' ) {
        foreignKeyConstraint(err, res);
    }
    
}