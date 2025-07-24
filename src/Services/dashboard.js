import axios from "../axios/index.js";

export class DashboardServices {
    async getChannelVideos(){
        try{
            return (await axios.get("/dashboard/videos")).data
        }catch (err){
            console.error("services :: DashboardServices :: getChannelVideos :: error:")
            throw err
        }
    }

    async getChannelStats(){
        try{
            return (await axios.get("/dashboard/stats")).data
        }catch (err){
            console.error("services :: DashboardServices :: getChannelStats :: error:")
            throw err
        }
    }
}

const dashboardServices = new DashboardServices()

export default dashboardServices