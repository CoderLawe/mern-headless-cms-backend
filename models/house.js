const mongoose = require("mongoose");
const HouseSchema = new mongoose.Schema({
  title: {
    type: String,
    required:false
  },
  owner: {
    type: String,
    required:false
  },
  description: {
    type: String,
  },
  published_date: {
    type: Date,
    required:false
  },

  price:{
    type:Number
  },

  guests:{
    type:Number
  },
  image:{
    type:String,
    required:false
  },
  images:{
    type:Array,
    required:false
  }
});

module.exports = House = mongoose.model("house", HouseSchema);
