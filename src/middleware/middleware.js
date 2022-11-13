const jwt = require("jsonwebtoken");
const agriModel = require("../models/agriModel");
const mongoose = require("mongoose");


//............................................MIDDLEWARE-FOR AUTHENTICATION..........................................................

const authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"] || req.headers["x-Api-Key"];

    if (!token) {
      return res.status(403).send({ status: false, msg: "Token must be Present" });
    }

    let decodedtoken = jwt.verify(token, "agriculture",function(err){
      if(err){
        return res.status(403).send({status:false,message:"Invalid Token",Error:err})
      }else{
next()
      }
    }); 
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};




//............................................MIDDLEWARE-FOR AUTHORIZATION..........................................................


const authorization = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"] || req.headers["x-Api-Key"]; //token has jwt token

    const id = req.params.id;

    if (id) {
      let isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        return res.status(400).send({ status: false, msg: "Id is Not Valid type of ObjectId" });
      }
    }

    const findData = await agriModel.findById(id)
  
    if (!findData) {
      return res.status(400).send({ status: false, msg: "Incorrect Id" });
    }

    let decodedtoken = jwt.verify(token, "agriculture",function(err){
      if(err){
        return res.status(403).send({status:false,message:"Invalid Token",Error:err})
      }else{
next()
      }
    }) //if match then move the execution to next
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};


module.exports={authentication ,authorization}

