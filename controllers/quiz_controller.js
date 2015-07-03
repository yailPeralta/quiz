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
                res.render('quizes/index', { quizes: quizes, errors: [] });
            }
        });

    }else{
        models.Quiz.findAll().then(function (quizes) {
            res.render('quizes/index', { quizes: quizes, errors: [] });
        });
    }
};

exports.show = function (req, res) {
    res.render('quizes/show', { quiz: req.quiz, errors: []})
};

exports.answer = function (req, res) {
    var respuesta = req.query.respuesta;

    var resultado = "Incorrecto";

    if(respuesta === req.quiz.respuesta){
       resultado = "Correcto";
    }

    res.render('quizes/answer', { quiz: req.quiz, respuesta: resultado, errors: []});

};

exports.new = function (req, res) {
    var quiz = models.Quiz.build({
        pregunta: "Pregunta",
        respuesta: "Respuesta"
    });
    res.render('quizes/new', { quiz: quiz, errors: [] });
};

exports.create = function (req, res) {
    var quiz = models.Quiz.build( req.body.quiz );

    quiz.validate()
        .then(function (err) {
            if(err){
                res.render("quizes/new", {quiz: quiz, errors: err.errors})
            }else{
                quiz.save({fields: ['pregunta', 'respuesta']})
                    .then(function () {
                        res.redirect('/quizes')
                    })
            }
        });
};

module.exports.edit = function (req, res) {
    var quiz = req.quiz;

    res.render('quizes/edit', {quiz : quiz, errors: []});
};

module.exports.update = function (req, res) {
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;


    req.quiz.validate()
        .then(function (err) {
            if(err){
                res.render("quizes/edit", {quiz: quiz, errors: err.errors})
            }else{
                req.quiz.save({fields: ['pregunta', 'respuesta']})
                    .then(function () {
                        res.redirect('/quizes')
                    })
            }
        });
};

module.exports.destroy = function (req, res) {
    req.quiz.destroy()
        .then(function () {
            res.redirect('/quizes');
        }).catch(function (error) {
            next(error);
        })
};