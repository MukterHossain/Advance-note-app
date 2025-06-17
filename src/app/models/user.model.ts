import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethods, UserStaticMethods } from "../interfaces/user.interface";
import validator from "validator";
import bcrypt from "bcryptjs";
import { Note } from "./notes.model";


// const addressSchema = mew Schema<IAddress>({
// city: {type: String},
//         street: {type: String},
//         zip: {type: Number}
// })

const addressSchema = new Schema<IAddress>({ 
    city: {type: String},
        street: {type: String},
        zip: {type: Number}
}, {
    _id:false
})

//const userSchema = new Schema<IUser, Model<IUser>, UserInstanceMethods>({

const userSchema = new Schema<IUser, UserStaticMethods, UserInstanceMethods>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
        minlength:[5, 'Name must be at least 5 characters, got {VALUE}'] ,
        maxlength: 10
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minlength:[5, 'Name must be at least 5 characters, got {VALUE}'],
        maxlength: 10
    },
    age: {
        type: Number,
        required: true,
        min:[18, 'Must be at least 18, got {VALUE}'],
        max:60
    },
    email: {
        type: String,
        unique: [true, 'Email must be unique'],
        required: true,
        lowercase: true,
        trim: true,
        // validate:{
        //     validator: function (value){
        //         return /^[^\s@]+@[^\s@]+\.[^\s@]+s/.test(value)
        //     },
        //     message: function(props){
        //         return `${props.value} is not a valid email address`
        //     }
        // }
        validate: [validator.isEmail, "Invalid email address {VALUE}"]
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        uppercase: true,
        enum: {
            values: ['USER', 'ADMIN', 'SUPERADMIN'],
            message: 'Role is not valid. got {VALUE} role'
        },
        default: 'USER'
    },
    address:{
        type: addressSchema
        // city: {type: String},
        // street: {type: String},
        // zip: {type: Number}
    }
    
},
{
    versionKey: false, // to remove __v field from the document
    timestamps: true, // to add createdAt and updatedAt fields
    toJSON: {virtuals:true},
    toObject: {virtuals:true}
})


userSchema.method("hashPassword", async function(plainPassword: string){
   const password = await bcrypt.hash(plainPassword, 10); 
    return password;
})

userSchema.static("hashPassword", async function(plainPassword: string){
   const password = await bcrypt.hash(plainPassword, 10);
    return password;
})


// Pre 
// Document Middleware
userSchema.pre("save", async function(next){
    console.log("Before saving the user document");
    this.password = await bcrypt.hash(this.password, 10);
    console.log(this)
    next();

} )

// Query Middleware
userSchema.pre("find", function(next){
    console.log("Before finding the user document");
    next()
})


// Post Hooks
// Document middleware
userSchema.post("save", async function(doc, next){
    console.log("%s Post saving the user document", doc._id);
    // this.password = await bcrypt.hash(this.password, 10);
    console.log(this)
    next();

} )
// query middleware
userSchema.post("findOneAndDelete", async function(doc, next){
    if(doc){
        console.log(doc)
    await Note.deleteMany({user: doc._id})
}
next()
})


// concat virtuals
userSchema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`;
})



export const User = model<IUser, UserStaticMethods>("User", userSchema)