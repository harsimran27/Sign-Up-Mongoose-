const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const port = "5000"

app.listen(port, function () {
    console.log(`connected at port ${port}`);
})

app.use(express.json());
app.use(express.static('public'));

const userRouter = require("./router/userRouter");
const authRouter = require("./router/authRouter");

app.use("/user", userRouter);
app.use("/auth", authRouter);

