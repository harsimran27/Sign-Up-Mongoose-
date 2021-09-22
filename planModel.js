const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({

    id:{
        type:Number,
    },

    name:{
        type:String,
        required:true
    },

    rating:{
        type:Number
    },

    price:{
        type:Number,
    },

    delivery:{
        type:Number,

    },

    meals:{
        type:Number,
    },

    description:{
        type:String,
        
    },


})