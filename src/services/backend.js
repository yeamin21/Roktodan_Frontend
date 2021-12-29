import axios from "axios";

const baseUrl = 'https://yeamin21.pythonanywhere.com/api/'
export const axiosInstance = axios.create({ baseURL: baseUrl, timeout: 10000 })