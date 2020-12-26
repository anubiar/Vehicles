import axios from 'axios'
import Config from "../config/Config";


const apiClient = axios.create({
    baseURL : Config.apiUrl,
    headers: {
        Accept : "application/json",
        "Content-Type" : "application/json",
    }
})

apiClient.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        Promise.reject(error);
    }
)

apiClient.interceptors.request.use(
    response => successHandler(response),
    err => errorHandler(err)
)

export default {
    get(path:string,params:any) {
        return apiClient.get(`/${path}`,params)
            .then(response=>response.data);
    },
    getWithBody(path:string,body:any){
        return apiClient.get(`/${path}`,{params : body})
            .then(response=>response.data)
    },
    post(path:string,body : any) {
        return apiClient.post(`/${path}`,body,{
            headers: {
                "Content-Type" : "application/json",
            }
        })
    },
    postFormData(path:string,body:any){
        return apiClient.post(`/${path}`,body,{
            headers : {
                'Content-Type' : 'multipart/form-data',
                "X-Requested-With": "XMLHttpRequest"
            }
        })
    },
    put(path:string,body:any){
        return apiClient.put(`/${path}`,body);
    },
    delete(path:string){
        return apiClient.delete(`/${path}`);
    },
}

const errorHandler = (err: any) => {
    // if (err.response && err.response.status === 401) store.dispatch('authentication/logout');
    return Promise.reject(err);
};

const successHandler = (response: any) => {
    return response;
};
