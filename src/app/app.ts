import express, {Application, Request, Response} from 'express';
import { model, Schema } from 'mongoose';

const app: Application = express();

// create a schema for notes
const noteSchema = new Schema({
    title: String,
    content: String,
})

// create a model for notes
const Note = model("Note", noteSchema)


app.post("/create-note",  async(req: Request, res: Response) => {
    const myNote = new Note({
        title: "My First Note with Mongoose",
        content: "This is the content of my first note",
    })
    await myNote.save();
    res.status(201).json({
        success:true,
        message: "Note created successfully",
        note: myNote })

})

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Note App")

})

export default app;