const express = require('express')
const router = express.Router()
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator')


//  Fetching all the notes a user has saved on the server / Authentication required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    return res.json(notes)
})

//  Storing Notes on the server / Authentication required
// user , title, description, tag
router.post('/savenote', fetchuser, [
    body('title', 'title must be at least 3 characters long').isLength({ min: 3 }),
    body('description', 'description must be at least 6 characters long').isLength({ min: 6 })
], async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ error: errors.array() })
        }

        const note = await Notes.create({
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag,
            user: req.user.id
        })

        return res.json({ note })

    } catch (error) {
        res.status(400).json({ error: "internal server error" })
        return;
    }
});

// Updating the notes of the user / Authentication required
router.put('/updatenote/:id', fetchuser, async (req, res) => {

    const { title, description, tag } = req.body;
    let note = {}
    if (title) note.title = title;
    if (description) note.description = description;
    if (tag) note.tag = tag;

    // finding the note using it's id
    let user = await Notes.findById(req.params.id);

    // Checking if the note is there in the database or not using it's supplied id
    if (!user) {
        return res.status(404).send("Not found")
    }

    // Checking if the id of the user is the same as of the note he/she is trying to update
    if (user.id.toString() !== req.params.id) {
        return res.status(401).send("Invalid request")
    }

    // Actually updating the notes of the user after verifying their authenticity
    user = await Notes.findByIdAndUpdate(req.params.id, { $set: note }, { new: true })
    return res.json({ user })

})

// Deleting the notes of the user / Authentication required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // finding the note using it's id
        let user = await Notes.findById(req.params.id);

        // Checking if the note is there in the database or not using it's supplied id
        if (!user) {
            return res.status(404).send("Not found")
        }

        // Checking if the id of the user is the same as of the note he/she is trying to update
        if (user.id.toString() !== req.params.id) {
            return res.status(401).send("Invalid request")
        }

        user = await Notes.findByIdAndDelete(req.params.id)
        return res.json({ user })
    
    } catch (error) {
        console.error(error.message)
        return;
    }

})
module.exports = router;    