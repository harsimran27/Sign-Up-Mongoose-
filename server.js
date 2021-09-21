const express = require("express");
const { Mongoose } = require("mongoose");
const app = express();

const userModel = require("./userModal");

const port = "5000"

app.listen(port, function () {
    console.log(`connected at port ${port}`);
})

app.use(express.json());
app.use(express.static('public'));

const authRouter = express.Router();
app.use('/auth', authRouter);

authRouter.route('/signup').post(createUserAt, signUpUser);

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