/**
 * Created by Yail Anderson on 07/07/2015.
 */
var models = require("../models/models.js");

exports.load = function (req, res, next, commentId) {
    models.Comment.findOne({
        where: {
            id: Number(commentId)
        }
    }).then(function (comment) {
        if(comment){
            req.comment = comment;
            next()
        }else{
            next(new Error("No extiste commentId=" + commentId))
        }
    }).catch(function (error) {
        next(error);
    })
};

exports.publish = function (req, res) {
    req.comment.publicado = true;

    req.comment.save({
        fields: ["publicado"]
    }).then(function () {
        res.redirect('/quizes/' + req.params.quizId);
    }).catch(function (error) {
        next(error);
    })
};

// GET quizes/:quizId/comments/new
exports.new = function (req, res) {
    res.render('comments/new.ejs', {quizId: req.params.quizId, errors: []});
};

exports.create = function (req, res) {
    var comment = models.Comment.build({
        texto: req.body.comment.texto,
        quiz_id: req.body.comment.quizId
    });


    comment.
        validate()
        .then(function (err) {
            if(err){
                res.render('comments/new.js', {comment: comment, errors: err.errors});
            } else {
                comment
                .save()
                .then(function () {
                    res.redirect('/quizes/' + req.params.quizId)
                })
            }
        }).catch(function (error) {
            next(error);
        })
};