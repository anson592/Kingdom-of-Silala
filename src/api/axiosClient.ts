import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://lza.frp.sztulives.cn:460",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 6000000,
});

export default axiosClient;
