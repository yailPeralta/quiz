/**
 * Created by Yail Anderson on 02/06/2015.
 */
var models = require('../models/models.js');

exports.question = function (req, res) {

    models.Quiz.findAll().then(function (quiz) {
        res.render('quizes/question', { pregunta: quiz[0].pregunta })
    });
};

exports.answer = function (req, res) {
    var respuesta = req.query.respuesta;

    models.Quiz.findAll().then(function (quiz) {
        if(respuesta === quiz[0].respuesta){
            res.render('quizes/answer', { respuesta: 'Correcto'});
        }else{
            res.render('quizes/answer', { respuesta: 'Incorrecto'});
        }
    });
};