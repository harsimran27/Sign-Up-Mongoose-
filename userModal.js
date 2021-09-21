const mongoose = require("mongoose");
const { db_link } = require("./secret");
const validator = require("email-validator");

mongoose.connect(db_link).then(function () {
    console.log("db connected");
}).catch(function (err) {
    console.log(err);
})

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    age: {
        type: Number,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return validator.validate(this.email);
        }
    },

    createdAt: {
        type: Date
    },

    password: {
        type: String,
        required: true,
        min: 8,
    },

    confirmPassword: {
        type: String,
        required: true,
        min: 8,
        validate: function () {
            return this.password == this.confirmPassword;
        },

    }
});

userSchema.pre('save', function () {
    this.confirmPassword = undefined;
})

let userModel = mongoose.model('userModel', userSchema);

// (async function createUser(){
//     let user={
//         name:"SVGAnimateTransformElement",
//         age:10,
//         email:"abc@gmail.com",
//         password: "12345678",
//         confirmPassword: "12345678",
//     };

//     let userObj = await userModel.create(user);
//     console.log(userObj);
// })();

module.exports = userModel;