import axios from "../axios/index.js";

export class DislikeServices{
    async ToggleVideoDislike(videoId){
        try{
            return (await axios.post(`/dislikes/toggle/v/${videoId}`)).data
        }catch (err){
            console.error("services :: DislikeServices :: ToggleVideoDislike :: error:")
            throw err
        }
    }

    async ToggleCommentDislike(commentId){
        try{
            return (await axios.post(`/dislikes/toggle/c/${commentId}`)).data
        }catch (err){
            console.error("services :: DislikeServices :: ToggleCommentDislike :: error:")
            throw err
        }
    }

    async ToggleTweetDislike(tweetId){
        try{
            return (await axios.post(`/dislikes/toggle/t/${tweetId}`)).data
        }catch (err){
            console.error("services :: DislikeServices :: ToggleTweetDislike :: error:")
            throw err
        }
    }

    async getDislikedVideos(){
        try{
            return (await axios.get("/dislikes/videos")).data
        }catch (err){
            console.error("services :: DislikeServices :: getDislikedVideos :: error:")
            throw err
        }
    }
}

const dislikeServices = new DislikeServices()

export default dislikeServices