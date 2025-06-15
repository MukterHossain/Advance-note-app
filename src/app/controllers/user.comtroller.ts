import express, { Request, Response } from "express";
import { User } from "../models/user.model";

export const usersRoutes = express.Router();


// create a route to create a note
usersRoutes.post("/create-user",  async(req: Request, res: Response) => {
    const body = req.body;
    const user = await User.create(body)
    res.status(201).json({
        success:true,
        message: "User created successfully",
        user
    })
})
// create a route to get all notes
usersRoutes.get("/",  async(req: Request, res: Response) => {
    const users = await User.find()
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
    const user = await User.findByIdAndDelete(userId)
    res.status(201).json({
        success:true,
        message: "User Deleted successfully",
        user
    })
})