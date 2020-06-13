var User = require('../models/user.model')
var bcrypt = require('bcrypt')

exports.find = async (column, query) => {
    try {
        let users = await User.find({ name: new RegExp('' + query + '', "i") });
        return users;
    }
    catch (error) {
        throw Error("Error")
    }
}

exports.setFollowed = async (id, followed) => {

    let user = await User.findOne({ _id: id });
    let user_ret;
    try {

        let a;
        if (user.follows != undefined) {
            a = await user.follows.some((x) => x._id == followed)
        } else {
            a = false;
        }
        if (!a) {
            let obj = {
                _id: followed
            }
            user.follows.push(obj);
            user_ret = await user.save();
        } else {
            return (user);
        }
        return user_ret;
    }
    catch (error) {
        return Error("Error");
    }
}

exports.getFollowed = async (seguidor, userMap) => {

    try {
        await User.find({}, async function (err, users) {

            users.forEach(function (user) {
                seguidor.follows.forEach((x) => {

                    if ((x._id + "").trim() == (user._id + "").trim()) {
                        user.password = "";
                        userMap.push(user);
                    }
                })

            });
        });
        return userMap;
    }
    catch (e) {
        throw Error("error");
    }
}

exports.unsetFollowed = async (id, followed) => {
    let user = await User.findOne({ _id: id })
    try {
        let a = await user.follows.some((x) => x._id == followed)
        let pos = user.follows.findIndex(x => x._id == followed);
        if (pos != -1) {
            user.follows.splice(pos, 1);
        }
        let b = await user.save();
        return (b);
    }
    catch (error) {
        return (Error("Error"));
    }
}

exports.getUsers = async () => {
    try {
        var userMap = [];
        await User.find({}, function (err, users) {


            users.forEach(function (user) {
                userMap.push(user);
            });


        });
        return userMap;
    }
    catch (err) {
        throw Error("error");
    }
}


exports.logoutAll = async (user) => {
    try {
        user.tokens.splice(0, user.tokens.length)
        await user.save()
        return true;
    } catch (error) {
        return false;
    }
}


exports.login = async (email, password) => {

    try {

        const user = await this.findByCredentials(email, password)
        if (!user) {
            return ({ error: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        return ({ user, token })
    } catch (error) {
        return (error);
    }


}






exports.logout = async (request) => {
    try {
        request.user.tokens = request.user.tokens.filter((token) => {
            return token.token != request.token
        })
        await request.user.save()
        return true;
    } catch (error) {
        return false;
    }
}


exports.addUser = async (user) => {
    let resultuser;
    try {
        try {
            resultuser = await user.save();
        }
        catch (e) {
            return e;
        }
        return resultuser;
    }
    catch (e) {
        throw Error(e);
    }
}






exports.findByCredentials = async function (email, password) {
    try {
        const user = await User.findOne({ email })

        if (!user) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        return user
    }
    catch (e) {
        throw Error("error");
    }
}


exports.updateUser = async function (id, cambios) {
    let user = await User.findOne({ _id: id })
    user.email = cambios.email;
    user.name = cambios.name;
    user.username = cambios.username;
    user.address = cambios.address;
    user.job = cambios.job;
    user.password = cambios.password;
    let resultuser = await user.save();
    return resultuser;
}


exports.deleteUser = async function (id) {
    let user = await User.deleteOne({ _id: id });
    if (user.deletedCount == 1) {
        return true;
    } else return false;
}

exports.searchUserByField = async function (field, value) {
    try {
        let users;
        switch (field) {
            case 'username': users = await User.find({ username: new RegExp('' + value + '', "i") });
                break;
            case 'email': users = await User.find({ email: new RegExp('' + value + '', "i") });
                break;
            case 'surname': await User.find({ surname: new RegExp('' + value + '', "i") });
                break;
            default: users = await User.find({})
                break;
        }
        return users;
    }
    catch (error) {
        throw Error("Error")
    }
}