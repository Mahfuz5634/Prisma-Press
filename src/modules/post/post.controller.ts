import { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync"
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";
import HttpStatus  from "http-status";




const createPost=catchAsync( async(req:Request, res:Response,next:NextFunction)=>{
     
        const id=req.user?.id as string;
        console.log(id);
        const payload=req.body;

        const result = await postService.createPost(payload,id);

       
    sendResponse(res,{
        success:true,
        statusCode:HttpStatus.OK,
        message:"Post created successfully",
        data:result
    })


})

const getAllPosts=catchAsync( async(req:Request, res:Response,next:NextFunction)=>{
        const result= await postService.getAllPosts();
           
        sendResponse(res,{
        success:true,
        statusCode:HttpStatus.OK,
        message:"Retrive All post",
        data:result
    })
})

const getPostStats=catchAsync( async(req:Request, res:Response,next:NextFunction)=>{

})

const getMyProfile=catchAsync( async(req:Request, res:Response,next:NextFunction)=>{

})

const getMyPost=catchAsync( async(req:Request, res:Response,next:NextFunction)=>{

})

const getPostById=catchAsync( async(req:Request, res:Response,next:NextFunction)=>{

})

const updatePost=catchAsync( async(req:Request, res:Response,next:NextFunction)=>{

})

const deletePost=catchAsync( async(req:Request, res:Response,next:NextFunction)=>{

})

export const postController={
    createPost,
    getAllPosts,
    getPostStats,
    getPostById,
    updatePost,
    deletePost,
    getMyProfile,
    getMyPost
}