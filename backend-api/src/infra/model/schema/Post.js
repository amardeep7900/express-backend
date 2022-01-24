const mongoose= require('mongoose');
 const postschema= mongoose.Schema({

  title:{
    type:String,
  
  },
  name:{
    type:String,
  },
  age:Number,
  date:{
    type:Date,
    default:Date.now
  }
 })
 module.exports = mongoose.model('Post',postschema)