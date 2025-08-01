import axios from "../axios/index.js";

export class UserServices {
    async register(userData){
        try{
            return (await  axios.post("/users/register", userData))
        } catch (err){
            console.error("services :: userServices :: register :: error:")
            throw err
        }
    }

    async login(userData) {
        try {
            return (await axios.post("/users/login", userData)).data
        } catch (err){
            console.error("services :: userServices :: login :: error:")
            throw err
        }
    }

    async logout() {
        try {
            return (await axios.post("/users/logout")).data
        } catch (err){
            console.error("services :: userServices :: logout :: error:")
            throw err
        }
    }

    async refreshToken(){
        try{
            return (await axios.post("/users/refresh-token")).data
        } catch (err){
            console.error("services :: userServices :: refreshToken :: error:")
            throw err
        }
    }

    async changePassword(passwords){
        try{
            return (await axios.post("/users/change-password", passwords)).data
        } catch (err){
            console.error("services :: userServices :: changePassword :: error:")
            throw err
        }
    }

    async getUser(){
        try {
            return (await axios.get("/users/current-user")).data
        } catch (err){
            console.error("services :: userServices :: getUser :: error:")
            throw err
        }
    }

    async updateAccountDetails(userData){
        try {
            return (await axios.patch("/users/update-account-details", userData)).data
        } catch (err){
            console.error("services :: userServices :: updateAccountDetails :: error:")
            throw err
        }
    }

    async updateAvatar(avatar){
        try {
            return (await axios.patch("/users/update-avatar", avatar)).data
        } catch (err) {
            console.error("services :: userServices :: updateAvatar :: error:")
            throw err
        }
    }

    async updateCoverImage(coverImage){
        try {
            return (await axios.patch("/users/update-cover-image", coverImage)).data
        } catch (err) {
            console.error("services :: userServices :: updateCoverImage :: error:")
            throw err
        }
    }

    async getChannelProfile(userName){
        try {
            return (await axios.get(`/users/c/${userName}`)).data
        } catch (err){
            console.error("services :: userServices :: getChannelProfile :: error:")
            throw err
        }
    }

    async getWatchHistory(){
        try {
            return (await axios.get("/users/history")).data
        } catch (err){
            console.error("services :: userServices :: getWatchHistory :: error:")
            throw err
        }
    }
}

const userServices = new UserServices()

export default userServices