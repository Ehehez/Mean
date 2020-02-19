
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var UserService = require('../services/user.service');



//Busca usuarios
exports.searchUsers = async (req, res) => {
    try {
        var name = req.body.name
        var users = await UserService.find(name)
        res.send(users)
    }
    catch (error) {
        res.send(error)
    }
}

//Sigue a un user
exports.followUser = async (req, res) => {

    const id = req.user._id
    const followed = req.body._id
    let a = await UserService.setFollowed(id, followed)
    res.send(a)


}

//Deja de seguir a un user
exports.unfollowUser = async (req, res) => {

    let id = req.user._id
    let followed = req.body._id

    let ret = await UserService.unsetFollowed(id, followed)

    res.send(ret)
}

//Devuelve lista de follows
exports.getFollowers = async (req, res) => {
    let user = req.user
    let userMap = []

    userMap = await UserService.getFollowed(user, userMap)

    res.send(userMap)

}

//Devuelve lista de users
exports.getUsers = async (req, res) => {

    let users = await UserService.getUsers()
    res.send(users)
}


//Elimina todos los tokens
exports.logoutAll = async (req, res) => {
    let user = req.user

    let result = await UserService.logoutAll(user)
    if (result) {
        res.send("Successful logout")
    } else {
        res.send("Error")
    }
}

//Elimina el token actual
exports.logout = async (req, res) => {
    let request = req

    let resultado = await UserService.logout(request)

    if (resultado) {
        res.send("Success")
    } else {
        res.send("Error")
    }
}


//Login
exports.login = async function (req, res) {

    let email = req.body.email
    let password = req.body.password

    let result = await UserService.login(email, password)

    res.send(result)
}



//Añade usuario nuevo
exports.addUser = async (req, res) => {
    let user = new UserModel(req.body)
    let data = await UserService.addUser(user)
    if (data.errmsg != undefined) {
        res.send(data)
    } else res.send(data)

};


//Actualiza usuario
exports.updateUser = async function (req, res) {
    let id = req.user._id
    let cambios = req.body

    let resultado = await UserService.updateUser(id, cambios)

    res.send(resultado)
};


//Borra usuario
exports.deleteUser = async function (req, res) {
    let id = req.body._id

    let result = await UserService.deleteUser(id)

    if (result) {
        res.send("Successful")
    } else res.send("Failed")
};

//Devuelve datos del usuario
exports.getProfile = async (req, res) => {
    res.send(req.user)
}


exports.searchUserByField = async (req, res) => {

    let field = req.params.field;
    let value = req.params.value;

    let result = await UserService.searchUserByField(field, value);

    res.send(result);
}