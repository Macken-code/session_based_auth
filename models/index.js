const {Sequelize, DataTypes} = require('sequelize');
const config = require('config');
const session = require('express-session');

const db = {};

// initialize sequelize
async function seqInit(){

    try {

        const databaseServerConnection = new Sequelize(`mysql://${config.get('db.username')}:${config.get('db.password')}@${config.get('db.host')}:${config.get('db.port')}`);
        
        const CREATEDB_QUERY = `CREATE DATABASE IF NOT EXISTS ${config.get('db.name')}`;

        // Create the database if not exist
        await databaseServerConnection.query(CREATEDB_QUERY);
        console.log('Database created successfully.');

        const sequelize = new Sequelize(config.get('db.name'), config.get('db.username'), config.get('db.password'), {
            host: config.get('db.host'),
            port: config.get('db.port'),
            dialect: 'mysql',
            define: {
                freezeTableName: true
            }
        });

        // getting all models
        db.user = require('./user.model').User(sequelize, DataTypes);
        db.role = require('./role.model').Role(sequelize, DataTypes);
        db.userSession = require('./userSession.model').UserSession(sequelize, DataTypes);

        //associations between user and role
        db.role.hasMany(db.user);
        db.user.belongsTo(db.role);

        

        // authentication
        await sequelize.authenticate();
        console.log('Connection is etablished...');
        
        // synchronisation
        await sequelize.sync();
        console.log('All models were synchronized successfully...');

        db.sequelize = sequelize;
        db.Sequelize = Sequelize;

    } catch (error) {
        console.error(error);
        console.error('CAUSE: Cannot connect to the database verify if database up...');
    }
}

seqInit();

module.exports = db;
