import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_LANDINGPAGE_API_URL;

const token = localStorage.getItem("authToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axios;