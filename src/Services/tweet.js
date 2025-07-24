import axios from "../axios/index.js";

export class TweetServices {
    async createTweet(tweetData){
        try{
            return (await axios.post("/tweets", tweetData)).data
        }catch (err){
            console.error("services :: TweetServices :: createTweet :: error:")
            throw err
        }
    }

    async getUserTweets(userId){
        try{
            return (await axios.get(`/tweets/user/${userId}`)).data
        }catch (err){
            console.error("services :: TweetServices :: getUserTweets :: error:")
            throw err
        }
    }

    async updateTweet(tweetId, tweetData){
        try{
            return (await axios.patch(`/tweets/${tweetId}`, tweetData)).data
        }catch (err){
            console.error("services :: TweetServices :: updateTweet :: error:")
            throw err
        }
    }

    async deleteTweet(tweetId){
        try{
            return (await axios.delete(`/tweets/${tweetId}`)).data
        }catch (err){
            console.error("services :: TweetServices :: deleteTweet :: error:")
            throw err
        }
    }
}

const tweetServices = new TweetServices()

export default tweetServices;