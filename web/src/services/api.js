import axios from 'axios';
import { getToken } from "./auth";

const api = axios.create({
    baseURL: "http://localhost:5555",
    headers: {
      'content-type': 'application/x-www-form-urlencoded',    //
      'content-type': 'application/json',                     //para cadastrar devs, etc
  },

});

api.interceptors.request.use(function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default api;