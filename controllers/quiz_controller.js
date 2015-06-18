/**
 * Created by Yail Anderson on 02/06/2015.
 */
var models = require('../models/models.js');

exports.index = function (req, res) {

    models.Quiz.findAll().then(function (quiz) {
        res.render('quizes/index');
    });
};

exports.show = function (req, res) {
    var id = req.query.quizId;

    models.Quiz.find( id ).then(function (quiz) {
        res.render('quizes/show', { quiz: quiz })
    });
};

exports.answer = function (req, res) {
    var respuesta = req.query.respuesta;

    var id = req.query.quizId;

    models.Quiz.find( id ).then(function (quiz) {

        if(respuesta === quiz.respuesta){
            res.render('quizes/answer', { quiz: quiz, respuesta: 'Correcto'});
        }else{
            res.render('quizes/answer', { quiz: quiz, respuesta: 'Incorrecto'});
        }

    });
};