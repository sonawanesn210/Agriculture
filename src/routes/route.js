const express = require("express")
const router = express.Router()

const {createUser,login}= require('../controllers/userController')
const {createAgriculture,getAgreeData,updateData,deleteData} = require("../controllers/agriController")
const {authentication,authorization} =require('../middleware/middleware')

router.post("/register",createUser)
router.post("/login", login)


// agreeculture data
router.post("/createdata",authentication,createAgriculture)
 router.get("/list",authentication,getAgreeData)
 router.put("/update/:id",authentication,authorization,updateData)
router.delete("/delete/:id",authentication,authorization,deleteData)
 

module.exports = router 