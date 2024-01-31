const mongoose = require("mongoose");
const SearchResultsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  img:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  location:{
    type:Number,
    required:false
  },
  star:{
    type:Number,
    required:true    
},

price:{
    type:Number,
    required:true    
},

total:{
    type:Number,
    required:true    
},


});

module.exports = SearchResult = mongoose.model("searchResult", SearchResultsSchema);
