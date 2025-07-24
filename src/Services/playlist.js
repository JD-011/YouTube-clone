import axios from "../axios/index.js";

export class PlaylistServices {
    async createPlayList(playlistData){
        try{
            return (await axios.post("/playlist", playlistData)).data
        }catch (err){
            console.error("services :: PlaylistServices :: createPlayList :: error:")
            throw err
        }
    }

    async getUserPlaylist(userId){
        try{
            return (await axios.get(`playlist/user/${userId}`)).data
        }catch (err){
            console.error("services :: PlaylistServices :: getUserPlaylist :: error:")
            throw err
        }
    }

    async addVideo(videoId, playlistId){
        try {
            return (await axios.patch(`/playlist/add/${videoId}/${playlistId}`)).data
        }catch (err){
            console.error("services :: PlaylistServices :: addVideo :: error:")
            throw err
        }
    }

    async removeVideo(videoId, playlistId){
        try {
            return (await axios.patch(`/playlist/remove/${videoId}/${playlistId}`)).data
        }catch (err){
            console.error("services :: PlaylistServices :: removeVideo :: error:")
            throw err
        }
    }

    async updatePlaylist(playlistId, playlistData){
        try{
            return (await axios.patch(`/playlist/${playlistId}`, playlistData)).data
        }catch (err){
            console.error("services :: PlaylistServices :: updatePlaylist :: error:")
            throw err
        }
    }

    async deletePlaylist(playlistId){
        try{
            return (await axios.delete(`/playlist/${playlistId}`)).data
        }catch (err){
            console.error("services :: PlaylistServices :: deletePlaylist :: error:")
            throw err
        }
    }

    async getPlaylist(playlistId){
        try{
            return (await axios.get(`/playlist/${playlistId}`)).data
        }catch (err){
            console.error("services :: PlaylistServices :: getPlaylist :: error:")
            throw err
        }
    }
}

const playlistServices = new PlaylistServices()

export default playlistServices