var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var userSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String },
    surname: { type: String },
    tokens: [{
        token: { type: String },
    }],
    follows: [{
        _id: { type: String }
    }]
}
);
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });


userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.methods.generateAuthToken = async function () {
    // Generate an auth token for the user

    const user = this
    const token = jwt.sign({ _id: user._id }, "prueba")
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}



const User = mongoose.model('User', userSchema)

module.exports = User;