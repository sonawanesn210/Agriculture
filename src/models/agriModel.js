const mongoose = require("mongoose")
let ObjectId = mongoose.Schema.Types.ObjectId


const agricultureSchema = new mongoose.Schema({
    
    organization: {
        type: String,
        required: true,
        trim:true
    },
    property : {
        type: String ,
         required: true
        },
    region : {
        type: String,
         required: true
        },
    field : {
        type: String,
         required: true
        },
    crop_cycle_property: {
        type: String, 
        required: true
    },
    crop_cycle_field : {
        type: String,
         required: true
        },
    crop : {
        type:  String,
         required: true
        },
    userId: {
        type: ObjectId, 
        ref: "agriuser" },

    isDeleted : {
            type: Boolean ,
             default : false
            },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true })

module.exports = mongoose.model("agriculture", agricultureSchema)