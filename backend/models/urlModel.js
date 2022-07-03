const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const urlSchema = new Schema({
    originalUrl : {
        type : String,
        required : true
    },
    token : {
        type : String,
        required : true
    },
    shortUrl : {
        type : String,
        required : true,
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
} , { timestamps : true });



module.exports = mongoose.model('Url' , urlSchema);