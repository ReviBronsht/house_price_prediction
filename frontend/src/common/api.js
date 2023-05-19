import axios from "axios";

const axiosApp = axios.create({
   baseURL: `http://localhost:5000`,
});

export default axiosApp;
