/**
 * Created by Yail Anderson on 09/07/2015.
 */
var users = {
    admin: {
        id: 1,
        username: "admin",
        password: "12345"
    },

    pepe: {
        id: 2,
        username: 'pepe',
        password: '6789'
    }
};

exports.autenticar = function (login, password, callback) {
    if(users[login]){
        if(password === users[login].password){
            callback(null, users[login]);
        }else{
            callback(new Error('Password Incorrecto.'));
        }
    }else{
        callback(new Error('No existe el usuario.'))
    }
};