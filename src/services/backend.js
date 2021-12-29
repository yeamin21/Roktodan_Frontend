import axios from "axios";

const baseUrl = 'https://yeamin21.pythonanywhere.com/api/'
// const baseUrl = 'http://localhost:8000/api/'
export const axiosInstance = axios.create({ baseURL: baseUrl, timeout: 10000 })