import axios from "axios";

const api = {
    get: (baseUrl, endPoint, data) => axios.get(baseUrl + endPoint, data),
    post: (baseUrl, endPoint, data) => axios.post(baseUrl + endPoint, data),
    put: (baseUrl, endPoint, data) => axios.put(baseUrl + endPoint, data),
    delete: (baseUrl, endPoint, data) => axios.delete(baseUrl + endPoint, data)
}

export default api;