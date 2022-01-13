const mongoose= require('mongoose');
 const postschema= mongoose.Schema({

  title:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  age:Number,
  date:{
    type:Date,
    default:Date.now
  }
 })
 module.exports = mongoose.model('Post',postschema)