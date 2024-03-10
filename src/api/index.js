import axios from "axios";

/* VITE_SERVER_BASE_URL = http://localhost:3000
 */

const api = axios.create({
    baseURL: "http://localhost:3000/ "
})