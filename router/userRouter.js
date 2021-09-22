const express = require("express");
const userModel = require("../userModal");

const userRouter = express.Router();
// const userModel = require("../userModal");

userRouter
    .route("/")
    .get(protectRoute, getuser);

async function getuser(req, res) {

    try {
        let users = await userModel.find();
        if (users) {
            return res.json(users);
        }
        else {
            return res.json({
                message: 'users not found'
            });
        }
    } catch (err) {
        return res.json({
            message: err.message,
        })
    }
}

function protectRoute(req, res, next) {
    try {
        if (req.cookies) {
            if (req.cookies.login == '1234') {
                next();
            }
            else {
                return res.json({
                    message: "not authorized"
                });
            }
        }
        else {
            return res.json({
                message: "operation not allowed"
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

module.exports = userRouter;