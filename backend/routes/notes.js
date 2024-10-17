import express from "express";
import fetchUser from "../middleware/fetchuser.js";
const router2 = express.Router();
import Notes from "../models/Notes.js";
import { body } from "express-validator";
import { validationResult } from "express-validator";
import mongoose from "mongoose";

//get all the notes
router2.get('/fetchallnotes', fetchUser,
    async (req, res) => {
        const notes = await Notes.find({ user: req.user });
        return res.json({ notes });
    })


//add a new note using post , login required
router2.post('/addnote', fetchUser,
    [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Enter a valid description').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors });
        }
        try {
            const note = await Notes.create({
                user: req.user,
                title: req.body.title,
                description: req.body.description,
                tag: req.body.tag,
            });
            return res.status(200).json({ note });
        }
        catch (errors) {
            return res.status(500).json({ errors: "Internal server error" })
        }
    })


// update an existing note
router2.put('/updateNote/:id', fetchUser,
    async (req, res) => {
        const { title, description, tag } = req.body;
        //create new note
        console.log("note ki id = ",req.params.id);
        const note = await Notes.findById((req.params.id));
        
        if (!note) {
            return res.status(404).send("Not found");
        }

        if (note.user.toString() !== req.user) {
            return res.status(401).send("Not allowed");
        }
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        const note2 = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        return res.json({ note2 });
    }
)


//delete a node
router2.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        const note = await Notes.findById(req.params.id.toString());
        if (note === null) {
            return res.status(200).send("Note does not exist");
        }
        if (note.user.toString() !== req.user) {
            return res.status(200).send("Access denied");
        }
        //console.log("The user = ",req.params.id);
        await Notes.findByIdAndDelete(req.params.id.toString());
        return res.status(200).send("Note deleted ",req.params.id.toString());
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
})

export default router2