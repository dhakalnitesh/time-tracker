import axios from "axios";
const api=axios.create({
    baseURL:"http://localhost:5000",
    headers: { 'Content-Type': 'application/json'}
});

api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("token");
if(token)
{
    config.headers.Authorization=`Bearer ${token}`;
}
return config;
});

export const login=async(credientals)=>{
const response=await api.post("/login",credientals);
if(response.data.token){
    localStorage.setItem("token",response.data.token);
    localStorage.setItem("user",JSON.stringify(response.data.user.id));
}  
return response.data;
}

export const signup=async(userData)=>{
const response=await api.post("/signup",userData);
return response.data;
}
export const taskAdd=async(taskData)=>{
    const response=await api.post("/addTask",taskData);
    return response.data;
}
export const deleteTask=async(id)=>{
    const response =await api.delete(`/task/${id}`);
    return response.data;
}



export default api;

