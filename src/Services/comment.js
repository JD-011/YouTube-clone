import axios from "../axios/index.js";

export class CommentServices {
    async getVideoComments(videoId, page, limit) {
        try{
            return (await axios.get(`/comments/${videoId}`, {
                params: {
                    page,
                    limit
                }
            })).data
        }catch (err){
            console.error("services :: CommentServices :: getVideoComments :: error:")
            throw err
        }
    }

    async addComment(videoId, commentData){
        try{
            return (await axios.post(`/comments/${videoId}`, commentData)).data
        }catch (err){
            console.error("services :: CommentServices :: addComment :: error:")
            throw err
        }
    }

    async updateComment(commentId, commentData){
        try{
            return (await axios.patch(`/comments/c/${commentId}`, commentData)).data
        }catch (err){
            console.error("services :: CommentServices :: updateComment :: error:")
            throw err
        }
    }

    async deleteComment(commentId){
        try {
            return (await axios.delete(`/comments/c/${commentId}`)).data
        }catch (err){
            console.error("services :: CommentServices :: deleteComment :: error:")
            throw err
        }
    }
}

const commentServices = new CommentServices();

export default commentServices;