/**
 * Created by Yail Anderson on 06/06/2015.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Quiz', {
        pregunta:{
            type: DataTypes.STRING,
            validate: { notEmpty: {msg: "--> Falta Pregunta"}}
        },
        respuesta:{
            type: DataTypes.STRING,
            validate: { notEmpty: {msg: "--> Falta Pregunta"}}
        }
    })
};