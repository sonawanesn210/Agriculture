const express = require("express")
const router = express.Router()

const {createUser,login}= require('../controllers/userController')
const {createAgriculture,getAgreeData,deleteData} = require("../controllers/agriController")


router.post("/register",createUser)
router.post("/login", login)


// agreeculture data
router.post("/createdata",createAgriculture)
 router.get("/list",getAgreeData)

router.delete("/delete/:id",deleteData)
 

module.exports = router 