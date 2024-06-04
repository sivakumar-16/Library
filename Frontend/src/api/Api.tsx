import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:9082'
})
export default api;