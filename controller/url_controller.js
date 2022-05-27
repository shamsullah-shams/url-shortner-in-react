const User = require("../models/userModel");
const crypto = require('crypto');
const urlModel = require('../models/urlModel');

exports.createShortUrl = async (req , res, next) => {
    let {longURL , currentHostName, userId}  = req.body;
    if(!longURL) {
        return res.json({message : "url is required"});
    }
    try {
        crypto.randomBytes(3 , async (err , buffer) => {
            if(err) {
                return res.status(506).json(err);
            }
            const token = buffer.toString('hex');
            const shortUrl =   currentHostName + token;
    
            try {
                const newUrl = new urlModel({originalUrl : longURL , shortUrl : shortUrl , token : token , userId : userId});
                await newUrl.save();
                return res.json({shortUrl : shortUrl , message : "short url create"});
            } catch (error) {
                return res.json({message : "try again"});
            }
        })
    } catch (error) {
    }
}



exports.redirectionToOUrl = async (req, res, next) => {
    const token = req.params.token;
    try {
        const url = await urlModel.findOne({token});
        return res.json({longurl : url.originalUrl});
    } catch (e) {
        res.status(500).send({
            error: e
        })
    }
    
}