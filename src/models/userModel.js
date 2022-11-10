const mongoose= require('mongoose')
const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        
    },
    name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },
  
      password: {
        type: String,
        maxlength: 15,
        minlength: 8,
        required: true,
        trim: true,
      },

     
},
{ timestamps: true }
)

module.exports = mongoose.model("agriuser", userSchema);