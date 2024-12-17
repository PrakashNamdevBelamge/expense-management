import axios from "axios";
import { useToast } from 'vue-toastification';

const toast = useToast()
const API_BASE_URL = "http://localhost:8080/api/expenses";

export const ExpenseService = {
  async addExpense(record) {
    try {
      const response = await axios.post(API_BASE_URL, record);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message)
      return false;
    }
  },
  async getAllExpenses(pageNumber, userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}?page=${pageNumber}&userId=${userId}`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message)
      return false;
    }
  },
  async getExpensesReport(userId, type) {
    try {
      const response = await axios.get(`${API_BASE_URL}/${userId}/${type}`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message)
      return false;
    }
  },
  async searchExpenses(query) {
    try {
      const response = await axios.get(`${API_BASE_URL}/search${query}`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message)
      return false;
    }
  },
  async updateExpense(employee) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/${employee.id}`,
        employee
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message)
      return false;
    }
  },
  async deleteExpense(id) {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
};
