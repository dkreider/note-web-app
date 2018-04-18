const Note = require("./models/note");
const router = require("express").Router();

router.get("/notes", function(req, res) {
    Note.find(function(findError, notes) {
        if (findError) {
            return res.status(500).send(findError);
        } else {
            return res.json(notes);
        }
    });
});

router.get("/note/:noteId", function(req, res) {
    if (!req.params.noteId) {
        return res.status(400).json({"error":true, "message":"Invalid GET request."});
    }
    Note.findById(req.params.noteId, function(findError, note) {
        if (findError) {
            return res.status(500).json(findError);
        } else {
            return res.json(note);
        }
    });
})

router.put("/note", function(req, res) {
    if (req.query.noteId) {
        Note.findByIdAndUpdate(req.query.noteId, {
            noteTitle: req.body.noteTitle,
            noteText: req.body.noteText
        }, {new:true}, function(updateError, updatedNote) {
            if (updateError) {
                return res.status(500).json(updateError);
            } else {
                return res.json(updatedNote);
            }
        });
    } else {
        return res.status(400).json({"error":true, "message":"Invalid PUT request."});
    }
});

router.post("/note", function(req, res) {
    Note.create({
        noteTitle: req.body.noteTitle,
        noteText: req.body.noteText
    }, function(createError, note) {
        if (createError) {
            return res.status(500).json(createError);
        } else {
            return res.json(note);
        }
    });
});

router.delete("/note/:noteId", function(req, res) {
    if (!req.params.noteId) {
        return res.status(400).json({"error":true, "message":"Invalid DELETE request."});
    }
    Note.findByIdAndRemove(req.params.noteId, function(deleteError, note) {
        if (deleteError) {
            return res.status(500).json(deleteError);
        } else {
            return res.json(note);
        }
    });
});

module.exports = router;