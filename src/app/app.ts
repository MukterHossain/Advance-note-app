import express, {Application, Request, Response} from 'express';
import { model, Schema } from 'mongoose';
import { Note } from './models/notes.model';
import { notesRoutes } from './controllers/notes.controller';
import { usersRoutes } from './controllers/user.comtroller';

const app: Application = express();
app.use(express.json());

app.use("/notes", notesRoutes)
app.use("/users", usersRoutes)

// // create a schema for notes
// const noteSchema = new Schema({
//     // title: String,
//     title: {type: String, required:true, trim: true},
//     // content: String,
//     content: {type: String, default: ''},
//     category: {
//         type: String, 
//         enum: ["personal", "work", "study", "other"],
//         default: "personal"
//     },
//     pinned: {
//         type: Boolean,
//         default: false
//     },
//     tags: {
//         label: {type: String, required: true},
//         color: {type: String, default: "gray"}
//     }
// },
// {
//     versionKey: false, // to remove __v field from the document
//     timestamps: true // to add createdAt and updatedAt fields
// }
// )

// // create a model for notes
// const Note = model("Note", noteSchema)

// // create a route to create a note
// app.post("/notes/create-note",  async(req: Request, res: Response) => {
//     const body = req.body;

//     // Approach 1 of creating a data
//     // const myNote = new Note({
//     //     title: "My First Note with Mongoose with express",
//     //     // content: "This is the content of my first note",
//     //     tags:{
//     //         label: "database"
//     //     }
//     // })
//     // await myNote.save();

//     // Approach 2 of creating a data
//     const note = await Note.create(body)
//     res.status(201).json({
//         success:true,
//         message: "Note created successfully",
//         // note: myNote 
//         note
//     })
// })
// // create a route to get all notes
// app.get("/notes",  async(req: Request, res: Response) => {
//     const notes = await Note.find()
//     res.status(201).json({
//         success:true,
//         message: "Note created successfully",
//         // note: myNote 
//         notes
//     })
// })
// // create a route to get a note by id
// app.get("/notes/:noteId",  async(req: Request, res: Response) => {
//     const noteId = req.params.noteId
//     const note = await Note.findById(noteId)
//     // const note = await Note.findOne({_id: noteId})
//     // const note = await Note.findOne({title: "Learning Nodes"})
//     res.status(201).json({
//         success:true,
//         message: "Note created successfully",
//         // note: myNote 
//         note
//     })
// })
// // create a route to update a note by id
// app.patch("/notes/:noteId",  async(req: Request, res: Response) => {
//     const noteId = req.params.noteId
//     const updatedBody = req.body;
//     // const note = await Note.findByIdAndUpdate(noteId, updatedBody, {new: true})
//     const note = await Note.findByIdAndUpdate({_id:noteId}, updatedBody, {new: true})
//     // const note = await Note.updateOne({_id:noteId}, updatedBody, {new: true})
//     res.status(201).json({
//         success:true,
//         message: "Note Update successfully",
//         // note: myNote 
//         note
//     })
// })
// app.delete("/notes/:noteId",  async(req: Request, res: Response) => {
//     const noteId = req.params.noteId
//     const note = await Note.findByIdAndDelete(noteId)
//     // const note = await Note.findByIdAndDelete({_id:noteId})
//     // const note = await Note.DeleteOne({_id:noteId})
//     res.status(201).json({
//         success:true,
//         message: "Note Update successfully",
//         // note: myNote 
//         note
//     })
// })

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Note App")

})

export default app;