import axios from "../axios/index.js";

export class VideoServices {
    async publishVideo(videoData){
        try {
            return (await axios.post("/videos", videoData)).data;
        }catch (err){
            console.error("services :: VideoServices :: publishVideo :: error:")
            throw err
        }
    }

    async getVideo(videoId){
        try{
            return (await  axios.get(`/videos/${videoId}`)).data
        }catch (err){
            console.error("services :: VideoServices :: getVideo :: error:")
            throw err
        }
    }

    async updateVideo(videoId, videoData){
        try {
            return (await axios.patch(`/videos/${videoId}`, videoData)).data;
        }catch (err){
            console.error("services :: VideoServices :: updateVideo :: error:")
            throw err
        }
    }

    async deleteVideo(videoId){
        try{
            return (await axios.delete(`/videos/${videoId}`)).data;
        }catch (err){
            console.error("services :: VideoServices :: deleteVideo :: error:")
            throw err
        }
    }

    async togglePublishStatus(videoId){
        try {
            return (await axios.patch(`/videos/toggle/publish/${videoId}`)).data;
        }catch (err){
            console.error("services :: VideoServices :: togglePublishStatus :: error:")
            throw err
        }
    }

    async getAllVideos(page = 1, limit = 12, query = "", sortBy = "createdAt", sortType = "desc", userId = "") {
        try {
            return (await axios.get("/videos", {
                params: {
                    page,
                    limit,
                    query,
                    sortBy,
                    sortType,
                    userId
                }
            })).data
        } catch (err){
            console.error("services :: VideoServices :: getAllVideos :: error:")
            throw err
        }
    }
}

const videoServices = new VideoServices()

export default videoServices