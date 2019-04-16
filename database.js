const mysql = require('./config').mysql;

var knex = require('knex')({
    client: 'mysql',
    connection: mysql
});

module.exports = knex;