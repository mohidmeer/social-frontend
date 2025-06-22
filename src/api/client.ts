import axios from 'axios';
import { Schedule } from '../types';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    headers: { "Content-Type": "application/json"},
    
});

// FIX 

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("social-api-auth-token");

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            console.log("No token found, proceeding without Authorization header.");
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const apiService = {
    async Login(data: any) {
        await new Promise(resolve => setTimeout(resolve, 500));
        try {
            const res = await axiosClient.post('/login', data)
            if (res.data.success){
                return res.data
            } else {
                throw Error('An Error Occured')
            }
        } catch (error) {
            throw new Error("Server Error Occured");
        }
    },
    async Register(data:any){
        await new Promise(resolve => setTimeout(resolve, 500));
        try {
            const res = await axiosClient.post('/register', data)
            if (res.data.success){
                return res.data
            } else {
                throw Error('An Error Occured')
            }

        } catch (error) {
            throw Error('An Error Occured')
        }

    } ,
    async GetAllSchedules(): Promise<{ success: boolean; schedules: Schedule[] }> {
        try {
            const response = await axiosClient.get("/schedule");

            

            if (response.data.success && Array.isArray(response.data.schedules)) {
                return response.data;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error fetching schedules:", error);
            throw new Error(error.response?.data?.message || "Failed to fetch schedules.");
        }
    },
    async DeleteSchedule(id: string): Promise<{ success: boolean }> {

       
        try {
            const response = await axiosClient.delete(`/schedule/${id}`, );

        

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error deleting schedule:", error);
            throw new Error(error.response?.data?.message || "Failed to delete schedule.");
        }
    },
    async RunSchedule(id: string): Promise<{ success: boolean }> {

       
        try {
            const response = await axiosClient.get(`/schedule/${id}/run`, );

        

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error deleting schedule:", error);
            throw new Error(error.response?.data?.message || "Failed to delete schedule.");
        }
    },    
    async StopSchedule(id: string): Promise<{ success: boolean }> {

       
        try {
            const response = await axiosClient.get(`/schedule/${id}/stop`, );

        

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error deleting schedule:", error);
            throw new Error(error.response?.data?.message || "Failed to delete schedule.");
        }
    },
    async AddCredits(data: { quantity: number }) {
        try {
            const response = await axiosClient.post("/credits", data, );

            return response.data; // Return the API response
        } catch (error: any) {
            console.error("Error adding credits:", error);
            throw new Error(error.response?.data?.message || "Failed to add credits.");
        }
    },
    async ShowCredits(): Promise<{ success: boolean; credits: number }> {
        try {
            const response = await axiosClient.get("/credits", );

            if (response.data.success && typeof response.data.credits === "number") {
                return response.data;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error fetching credits:", error);
            throw new Error(error.response?.data?.message || "Failed to fetch credits.");
        }
    },
    async AddSchedule(data: any): Promise<{ success: boolean; message?: string }> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const response = await axiosClient.post("/schedule", data, );

            if (response.data.success) {
                return response.data;
            } else {
                throw new Error(response.data.message || "Failed to add schedule.");
            }
        } catch (error: any) {
            console.error("Error adding schedule:", error);
            throw new Error(error.response?.data?.message || "An error occurred while adding the schedule.");
        }
    },
    async UpdateSchedule(id: string, data: any): Promise<{ success: boolean }> {
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const response = await axiosClient.put(`/schedule/${id}`, data, );
    
            if (response.data.success) {
                return response.data;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error updating schedule:", error);
            throw new Error(error.response?.data?.message || "Failed to update schedule.");
        }
    } ,
    async getSocailAccounts(){
        try {
            const response = await axiosClient.get('/socials');
    
            if (response.data.success) {
                return response.data.accounts;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error updating schedule:", error);
            throw new Error(error.response?.data?.message || "Failed to update schedule.");
        }
    },
    async SocailConnect(provider:string,callback_url:string){
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const response = await axiosClient.get(`/socials/connect/${provider}?callback_url=${callback_url}`);

            console.log(response)
            if (response.data.success) {
                return response.data.redirect_url;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error:any) {
            console.error(error);
            throw new Error(error.response?.data?.message || "Failed to connect socail account");
            
        }
    } , 
    async DeleteSocialAccount(id:string){
        try {
            const response = await axiosClient.delete(`/socials/${id}`);
            if (response.data) {
                return true;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error:any) {
            console.error(error);
            throw new Error(error.response?.data?.message || "Failed to connect socail account");
            
        }
    },
    async getHistory(query:string){
        try {
            const response = await axiosClient.get('/history?'+query);
    
            if (response.data.success) {
                return response.data.historyData;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error updating schedule:", error);
            throw new Error(error.response?.data?.message || "Failed to update schedule.");
        }
    },
    async DeleteHistory(id:string){
        try {
            const response = await axiosClient.delete('/history/'+id);
    
            if (response.data.success) {
                return true;
            } else {
                false;
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error updating schedule:", error);
            throw new Error(error.response?.data?.message || "Failed to update schedule.");
        }
    },
    async getDashboardStats(){
        try {
            const response = await axiosClient.get('/dashboard');
            if (response.data.success) {
                return response.data;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error updating schedule:", error);
            throw new Error(error.response?.data?.message || "Failed to update schedule.");
        }
    },
    async getUserSettings(){
        try {
            const response = await axiosClient.get('/settings');
            if (response.data.success) {
                return response.data.settings;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error updating schedule:", error);
            throw new Error(error.response?.data?.message || "Failed to update schedule.");
        }
    },
    async updateSettings(data:any){
        try {
            await new Promise(resolve => setTimeout(resolve, 500));
            const response = await axiosClient.post('/settings' ,data);
            if (response.data.success) {
                return response.data.settings;
            } else {
                throw new Error("Invalid API response format.");
            }
        } catch (error: any) {
            console.error("Error updating settings:", error);
            throw new Error(error.response?.data?.message || "Failed to updating settings.");
        }
    },
    async updateUserPassword(data:any){
        try {

            await new Promise(resolve => setTimeout(resolve, 500));
            const response = await axiosClient.post('/user' ,data);
            if (response.data.success) {
                return true;
            } else {
                return false

            }
        } catch (error: any) {
            console.error("Error saving password:", error);
            return false;
        }
    },
}
