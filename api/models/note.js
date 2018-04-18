const db = require("../../db");

var Note = db.model("Note", {
   noteTitle:{type:String, required:true},
   noteText:{type:String}
});

module.exports = Note;