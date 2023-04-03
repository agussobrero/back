import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 6000,
    headers: {}
})

export default client