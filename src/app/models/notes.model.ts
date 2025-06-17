import { model, Schema } from "mongoose"
import { INotes } from "../interfaces/notes.interface"

// create a schema for notes
const noteSchema = new Schema<INotes>({
    // title: String,
    title: {type: String, required:true, trim: true},
    // content: String,
    content: {type: String, default: ''},
    category: {
        type: String, 
        enum: ["personal", "work", "study", "other"],
        default: "personal"
    },
    pinned: {
        type: Boolean,
        default: false
    },
    tags: {
        label: {type: String, required: true},
        color: {type: String, default: "gray"}
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
},

{
    versionKey: false, // to remove __v field from the document
    timestamps: true // to add createdAt and updatedAt fields
},

)

// create a model for notes
export const Note = model<INotes>("Note", noteSchema)