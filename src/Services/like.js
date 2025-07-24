import axios from "../axios/index.js";

export class LikeServices{
    async ToggleVideoLike(videoId){
        try{
            return (await axios.post(`/likes/toggle/v/${videoId}`)).data
        }catch (err){
            console.error("services :: LikeServices :: ToggleVideoLike :: error:")
            throw err
        }
    }

    async ToggleCommentLike(commentId){
        try{
            return (await axios.post(`/likes/toggle/c/${commentId}`)).data
        }catch (err){
            console.error("services :: LikeServices :: ToggleCommentLike :: error:")
            throw err
        }
    }

    async ToggleTweetLike(tweetId){
        try{
            return (await axios.post(`/likes/toggle/t/${tweetId}`)).data
        }catch (err){
            console.error("services :: LikeServices :: ToggleTweetLike :: error:")
            throw err
        }
    }

    async getLikedVideos(){
        try{
            return (await axios.get("/likes/videos")).data
        }catch (err){
            console.error("services :: LikeServices :: getLikedVideos :: error:")
            throw err
        }
    }
}

const likeServices = new LikeServices()

export default likeServices