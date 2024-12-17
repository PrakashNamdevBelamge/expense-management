import axios from "axios";
import { useToast } from 'vue-toastification';

const toast = useToast()
const API_BASE_URL = "http://localhost:8080/api";

export const UserService = {
  async addUser(record) {
    try {
      const response = await axios.post(`${API_BASE_URL}/create-user`, record);
      toast.success('User created successfully');
      return response.data;
    } catch (error) {
      
      toast.error(error.response.data.message)
      return false;
    }
  },
  async validateUser(record) {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`,record);
      toast.success('User loggedIn successfully');
      return response.data;
    } catch (error) {
        if(error.response.data.message)
      toast.error(error.response.data.message)
      return false;
    }
  },
  async updatePassword(record) {
    try {
      const response = await axios.post(`${API_BASE_URL}/update-user`,record);
      toast.success('User credentials updated successfully');
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message)
      return false;
    }
  },
  }
