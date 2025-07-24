import conf from "../conf/index.js";
import axios from "axios";

export default axios.create({
    baseURL: conf.serverUrl,
    withCredentials: true
})