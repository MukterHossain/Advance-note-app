import express, { Request, Response } from "express";
import { Note } from "../models/notes.model";

export const notesRoutes = express.Router();


// create a route to create a note
notesRoutes.post("/create-note",  async(req: Request, res: Response) => {
    const body = req.body;

    // Approach 1 of creating a data
    // const myNote = new Note({
    //     title: "My First Note with Mongoose with express",
    //     // content: "This is the content of my first note",
    //     tags:{
    //         label: "database"
    //     }
    // })
    // await myNote.save();

    // Approach 2 of creating a data
    const note = await Note.create(body)
    res.status(201).json({
        success:true,
        message: "Note created successfully",
        // note: myNote 
        note
    })
})
// create a route to get all notes
notesRoutes.get("/",  async(req: Request, res: Response) => {
    const notes = await Note.find().populate("user")
    res.status(201).json({
        success:true,
        message: "Note created successfully",
        // note: myNote 
        notes
    })
})
// create a route to get a note by id
notesRoutes.get("/:noteId",  async(req: Request, res: Response) => {
    const noteId = req.params.noteId
    const note = await Note.findById(noteId)
    // const note = await Note.findOne({_id: noteId})
    // const note = await Note.findOne({title: "Learning Nodes"})
    res.status(201).json({
        success:true,
        message: "Note created successfully",
        // note: myNote 
        note
    })
})
// create a route to update a note by id
notesRoutes.patch("/:noteId",  async(req: Request, res: Response) => {
    const noteId = req.params.noteId
    const updatedBody = req.body;
    // const note = await Note.findByIdAndUpdate(noteId, updatedBody, {new: true})
    const note = await Note.findByIdAndUpdate({_id:noteId}, updatedBody, {new: true})
    // const note = await Note.updateOne({_id:noteId}, updatedBody, {new: true})
    res.status(201).json({
        success:true,
        message: "Note Update successfully",
        // note: myNote 
        note
    })
})
notesRoutes.delete("/:noteId",  async(req: Request, res: Response) => {
    const noteId = req.params.noteId
    const note = await Note.findByIdAndDelete(noteId)
    // const note = await Note.findByIdAndDelete({_id:noteId})
    // const note = await Note.DeleteOne({_id:noteId})
    res.status(201).json({
        success:true,
        message: "Note Update successfully",
        // note: myNote 
        note
    })
})