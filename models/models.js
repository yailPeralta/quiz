/**
 * Created by Yail Anderson on 13/06/2015.
 */
var path = require('path');
var Sequelize = require('sequelize');

var database_url = process.env.DATABASE_URL || 'sqlite://:@:/';

var url = database_url.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var dbName  = (url[6] || null);
var user    = (url[2] || null);
var pwd     = (url[3] || null);
var dialect = (url[1] || null);
var port    = (url[5] || null);
var host    = (url[4] || null);
var storage = process.env.DATABASE_STORAGE || 'quiz.sqlite';

var sequelize =  new Sequelize(dbName, user, pwd, {
    dialect: dialect,
    storage: storage,
    protocol: dialect,
    port: port,
    host: host,
    omitNull: true
});

var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz;

sequelize.sync().then(function () {
    Quiz.count().then(function (count) {
        if(count === 0){
            Quiz.create({
                pregunta: "Capital de Italia",
                respuesta: "Roma"
            }).then(function () {
                console.log('Base de datos inicializada!');
            })
        }
    })
});