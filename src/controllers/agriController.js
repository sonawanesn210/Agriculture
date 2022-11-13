const agriModel = require('../models/agriModel')
const userModel = require('../models/userModel')
const mongoose=require('mongoose')
const jwt = require('jsonwebtoken')

const createAgriculture = async (req,res)=>{
    try {
        const data = req.body;
 
        
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Please Enter Some Details" });
          }
    
        //Extract params
        const { organization, property, userId, region, field, crop_cycle_property, crop_cycle_field,crop,isDeleted,deletedAt} = data;

       
    
        // Validation starts
        if (!organization) {
            return res.status(400).send({ status: false, message: "Please Enter organization" });
        
        }
        if (!property) {
            return res.status(400).send({ status: false, message: "Please Enter property" });
        }

        if (!region) {
            return res.status(400).send({ status: false, message: "Please Enter region" });
          }
          if (!field) {
            return res.status(400).send({ status: false, message: "Please Enter field" });
          }
          if (!crop_cycle_property){
            return res.status(400).send({ status: false, message: "Please Enter crop_cycle_property" });
          }
          if (!crop_cycle_field) {
            return res.status(400).send({ status: false, message: "Please Enter crop_cycle_field" });
          }

          if (!crop){
            return res.status(400).send({ status: false, message: "Please Enter crop" });
          }

          if (!userId) {
            res.status(400).send({ status: false, message: "UserId is required" })
        }
        let isValiduserId = mongoose.Types.ObjectId.isValid(userId);  //return true or false


        if (!isValiduserId) {
            return res.status(400).send({ status: false, message: "userId is Not Valid" });
        }

        const finduserId = await userModel.findById(userId) //give whole data

        if (!finduserId) {
            return res.status(404).send({ status: false, message: "userId not found" })
        }

        if (isDeleted) {
            if (typeof (isDeleted) != "boolean") {
                return res.status(400).send({ status: false, message: "Invalid Input of isDeleted.It must be true or false " });
            }
            if (isDeleted == true) {
                return res.status(400).send({ status: false, message: "isDeleted must be false while creating todo" });
            }
        }
        
       
    
        const datacreated = {
          organization, property, region, field, crop_cycle_property,userId, crop_cycle_field,crop
        };
    
    
        let token = req.headers["x-api-key"] || req.headers["x-Api-Key"];
        let decodedtoken = jwt.verify(token, "agriculture");

        if (decodedtoken.UserId != datacreated.userId) {
            return res.status(401).send({ status: false, message: "You are Not Authorized To create data With This userId" });
        }
        

        const newData = await agriModel.create(datacreated);
        return res.status(201).send({ status: true,message: "New data created successfully", data: newData });
      } catch (error) {
        res.status(500).send({ status: false, message: error.message });
        console.log({message: error.message })
      }
}




const getAgreeData = async function (req, res) {
  try {
    const userId = req.query.userId;
    const organization = req.query.organization;
    const property = req.query.property;
    const region = req.query.region;
    const field = req.query.field;
    const crop_cycle_property = req.query.crop_cycle_property;
    const crop_cycle_field = req.query.crop_cycle_field;
    const crop = req.query.crop;
    const obj = {
      isDeleted: false,

    };
    if (userId)
      obj.userId = userId;
    if (organization)
      obj.organization = organization;
    if (property)
      obj.property = property;
      if (region)
      obj.region = region;
      if (field)
      obj.field = field;
      if (crop_cycle_property)
      obj.crop_cycle_property = crop_cycle_property;
      if (crop_cycle_field)
      obj.crop_cycle_field = crop_cycle_field;
      if (crop)
      obj.crop = crop;
    if (obj.userId) {
      let isValiduserId = mongoose.Types.ObjectId.isValid(obj.userId);//check if objectId is valid objectid
      if (!isValiduserId) {
        return res.status(400).send({ status: false, message: "userId is Not Valid" });
      }

      const finduserId = await userModel.findById(obj.userId)//check id exist in userModel
      if (!finduserId)
        return res.status(404).send({ status: false, message: "userId dont exist" })
    }

    const agridata = await agriModel.find(obj)
    if (agridata.length == 0) {
      return res.status(404).send({ status: false, message: "agridata not found" });
    }
    res.status(200).send({ status: true, count:agridata.length,message: "list", data: agridata });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};

  const updateData = async (req,res)=>{
    try{
      const id = req.params.id
      if(id){
        let isValidId=mongoose.Types.ObjectId.isValid(id)
        if (!isValidId) {
          return res.status(400).send({ status: false, message: "Id is Not Valid" });
        }
      }
      const AgriData = await agriModel.findOne({_id:id,isDeleted:false})
      if(!AgriData){
        return res.status(404).send({status:false,message:"No Data found"})
      }
      if(!req.body.organization && !req.body.property && !req.body.region && !req.body.field && !req.body.crop_cycle_property && !req.body.crop_cycle_field && !req.body.crop){
        return res.status(400).send({ status: false, message: "Please Provide data to update" })
      }

      if(req.body.organization){
        AgriData.organization=req.body.organization
      }
      if(req.body.property){
        AgriData.property=req.body.property
      }
      if(req.body.region){
        AgriData.region=req.body.region
      }
      if(req.body.field){
        AgriData.field=req.body.field
      }
      if(req.body.crop_cycle_property){
        AgriData.crop_cycle_property=req.body.crop_cycle_property
      }
      if(req.body.crop_cycle_field){
        AgriData.crop_cycle_field=req.body.crop_cycle_field
      }
      if(req.body.crop){
        AgriData.crop=req.body.crop
      }
      AgriData.save()
      return res.status(200).send({ status: true, message: "Success", data: AgriData }) 

    }
    catch (err) {
      res.status(500).send({ status: false, message: err.message });
    }
  }







const deleteData = async function (req, res) {
  try {
    
    let id = req.params.id;

    if (id) {
      let isValidId = mongoose.Types.ObjectId.isValid(id);

      if (!isValidId) {
          return res.status(400).send({ status: false, message: "Id is Not Valid" });
      }
  }

    const agriDetails = await agriModel.findOne({ _id:id })
        if (!agriDetails) {
            return res.status(404).send({ status: false, message: "No data found for this Id" })
        }

        if (agriDetails.isDeleted == true) {
            return res.status(404).send({ status: false, message: "This data is already Deleted" })
        }

        await agriModel.findOneAndUpdate({ _id: id, isDeleted: false }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
        return res.status(200).send({ status: true, message: "Successfully Deleted" })

  } catch (err) {
    res.status(500).send({ status: false, Error: err.message });
  }
};

module.exports={createAgriculture,getAgreeData,updateData,deleteData} 