import {PrismaClient} from "@prisma/client"
import {Request, Response} from "express"
const prisma = new PrismaClient()


export const createProduct =async(req:Request, res:Response)=>{
    try {
        const {userId} = req.params
        // const
    } catch (error) {
        return res.status(404).json({
            message:"error"
        })
    }
}