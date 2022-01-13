const express = require("express");
const router = express.Router();
const restcontroller = require("../../../domain/user/restcontroller");
//const protect= require('../../../domain/auth/protect')
const {createvaliadtion} =require('./create.validate')


router.get("/", restcontroller.getall);
router.post("/",createvaliadtion, restcontroller.createuser);
router.get("/:postId", restcontroller.getuser);
router.delete("/:postId", restcontroller.delete);
router.patch("/:postId", restcontroller.update);



module.exports = router;
