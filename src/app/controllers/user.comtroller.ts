import express, { Request, Response } from "express";
import { z } from "zod";
import { User } from "../models/user.model";

import bcrypt from "bcryptjs";

export const usersRoutes = express.Router();

const CreateUserZodSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    age: z.number(),
    email: z.string(),
    password: z.string(),
    role: z.string().optional()
})

// create a route to create a note
usersRoutes.post("/create-user",  async(req: Request, res: Response) => {
    try {
        const body = req.body;
        // const password = await bcrypt.hash(body.password, 10);
        // console.log(password, "hashed password");
        // body.password = password

        // const body = await CreateUserZodSchema.parseAsync(req.body);
        console.log(body, "zod body");
 // built in and custom intense methods
    // const user = await User.create(body)
    // const user = new User(body);
    // const password =await user.hashPassword(body.password)
    // user.password = password;
    // await user.save()

    // built in and custom static methods
    // const password = await User.hashPassword(body.password)
    // console.log(password, "Static hashed password");
    // body.password = password;
    const user = await User.create(body)

    res.status(201).json({
        success:true,
        message: "User created successfully",
        user: user
    })
        
    } catch (error: any) {
        console.log(error)
        res.status(400).json({
        success:false,
        message: error.message,
        error
    })
    }
})
// create a route to get all notes
usersRoutes.get("/",  async(req: Request, res: Response) => {
    const userEamil = req.query.email
    // const users = await User.find()
    // const users = await User.find({email: userEamil})
    let users = [];
    //filtering by email
    // if(userEamil){
    //     const users = await User.find({email: userEamil})
    // }else{
    //     const users = await User.find()
    // }

    // sorting 
    // users = await User.find().sort({email: "asc"})
    // users = await User.find().sort({email: "ascending"})
    // users = await User.find().sort({email: "desc"})
    // users = await User.find().sort({email: "descending"})
    // users = await User.find().sort({email: 1})
    // users = await User.find().sort({email: -1})

    // skipping 
    // users = await User.find().skip(5)


    // limiting
    users = await User.find().limit(2)

    res.status(201).json({
        success:true,
        message: "User all data retrive successfully",
        users
    })
})
// create a route to get a note by id
usersRoutes.get("/:userId",  async(req: Request, res: Response) => {
    const userId = req.params.userId
    const user = await User.findById(userId)
    res.status(201).json({
        success:true,
        message: "User data retrive successfully",
        user
    })
})
// create a route to update a note by id
usersRoutes.patch("/:userId",  async(req: Request, res: Response) => {
    const userId = req.params.userId
    const updatedBody = req.body;
    const user = await User.findByIdAndUpdate({_id:userId}, updatedBody, {new: true})
    res.status(201).json({
        success:true,
        message: "User Update successfully",
        user
    })
})
usersRoutes.delete("/:userId",  async(req: Request, res: Response) => {
    const userId = req.params.userId
    // const user = await User.findByIdAndDelete(userId)
    const user = await User.findOneAndDelete({_id:userId})
    res.status(201).json({
        success:true,
        message: "User Deleted successfully",
        user
    })
})