const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/note-app", function() {
    
   console.log("Connected to MongoDB database."); 
    
});

module.exports = mongoose;