import axios from "../axios/index.js";

export class SubscriptionServices {
    async toggleSubscription(channelId){
        try{
            return (await axios.post(`/subscriptions/c/${channelId}`)).data
        }catch (err){
            console.error("services :: SubscriptionServices :: toggleSubscription :: error:")
            throw err
        }
    }

    async getSubscribers(channelId, userId){
        try{
            return (await axios.get(`/subscriptions/c/${channelId}`,{
                params: { 
                    userId 
                }
            })).data
        }catch (err){
            console.error("services :: SubscriptionServices :: getSubscribers :: error:")
            throw err
        }
    }

    async getSubscribedChannels(subscriberId){
        try{
            return (await axios.get(`/subscriptions/u/${subscriberId}`)).data
        }catch (err){
            console.error("services :: SubscriptionServices :: getSubscribedChannels :: error:")
            throw err
        }
    }
}

const subscriptionServices = new SubscriptionServices()

export default subscriptionServices