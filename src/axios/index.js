import conf from "../conf";
import axios from "axios";

export default axios.create({
    baseURL: conf.serverUrl,
    withCredentials: true
})