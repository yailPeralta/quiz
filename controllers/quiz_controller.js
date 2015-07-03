/**
 * Created by Yail Anderson on 02/06/2015.
 */
var models = require('../models/models.js');

exports.load = function(req, res, next, quizId){
    models.Quiz.findOne({
        where: {
            // use param en vez de query, por que no me funcionaba
            id: req.param("quizId")
        }
    }).then(
        function (quiz) {
            if(quiz){
                req.quiz = quiz;
                next();
            }else{
                next(new Error("No existe quizId=", quizId));
            }
        }
    ).catch(function (error) {
        next(error);
    })
};

exports.index = function (req, res) {

    if(typeof req.query.search !== "undefined"){

        var search = req.query.search
            .trim()
            .replace("\s", "%")
            .toLowerCase();

        models.Quiz.findAll({

            where: ["lower(pregunta) LIKE ?", "%" + search + "%"]

        }).then(function (quizes) {
            if(quizes){
                res.render('quizes/index', { quizes: quizes });
            }
        });

    }else{
        models.Quiz.findAll().then(function (quizes) {
            res.render('quizes/index', { quizes: quizes });
        });
    }
};

exports.show = function (req, res) {
    res.render('quizes/show', { quiz: req.quiz })
};

exports.answer = function (req, res) {
    var respuesta = req.query.respuesta;

    var resultado = "Incorrecto";

    if(respuesta === req.quiz.respuesta){
       resultado = "Correcto";
    }

    res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado});

};