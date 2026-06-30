
import { prisma } from "../../lib/prisma"
import { ICreatePostPayload } from "./post.interface"




const createPost=async (payload:ICreatePostPayload,UserId:string)=>{

     const result = await prisma.post.create({
        data:{
            ...payload,
            authorId: UserId
        }
     })

     return result;
}

const getAllPosts=async()=>{
    const post= await prisma.post.findMany({
        include:{
            author:{
                omit:{
                    password:true
                }
            },
            comments:true
        }
    });
    return post;
}

const getPostStats=()=>{

}

const getMyProfile=( )=>{

}

const getMyPost=()=>{

}

const getPostById=()=>{

}

const updatePost=()=>{

}

const deletePost=()=>{

}

export const postService={
    createPost,
    getAllPosts,
    getPostStats,
    getPostById,
    updatePost,
    deletePost
}