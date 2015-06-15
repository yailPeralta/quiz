/**
 * Created by Yail Anderson on 06/06/2015.
 */
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Quiz', {
        pregunta: DataTypes.STRING,
        respuesta: DataTypes.STRING
    })
};