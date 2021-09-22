const express = require("express");
const userModel = require("../userModal");

const authRouter = express.Router();
// const userModel = require("../userModal")

authRouter
    .route('/signup')
    .post(createUserAt, signUpUser);

authRouter
    .route("/login")
    .post(loginUser);

function createUserAt(req, res, next) {
    let obj = req.body;
    //keys ka arr -> uska length
    let length = Object.keys(obj).length;
    if (length == 0) {
        return res.status(400).json({ message: "cannot create user if req.body is empty" })
    }
    req.body.createdAt = new Date().toISOString();
    next();
}

async function signUpUser(req, res) {
    try {

        let userObj = req.body;

        let user = await userModel.create(userObj);
        console.log(user);
        res.json({
            messgae: "user signed up",
            user: userObj,
        })

    } catch (err) {
        console.log(err);
        res.json({ message: err.message });
    }
}

async function loginUser(req, res) {
    try {
        if (req.body.email) {
            let user = await userModel.findOne({ email: req.body.email });
            if (user) {
                if (req.body.password == user.password) {
                    res.cookie('login', '1234', { httpOnly: true });
                    return res.json({
                        message: "user logged in",
                    })
                } else {
                    return res.json({
                        meassge: "email or password is wrong",
                    })
                }
            } else {
                return res.json({
                    message: "email or password is wrong",
                })
            }
        } else {
            return res.json({
                message: "user not present",
            })
        }
    } catch (err) {
        return res.json({
            message: err.message,
        })
    }
}

module.exports = authRouter;