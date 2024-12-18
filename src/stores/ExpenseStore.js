import { defineStore } from "pinia";
import { ExpenseService } from "@/services/ExpenseService";

export const useExpenseStore = defineStore("expStore", {
  state: () => ({
    expenses: [],
    pages: 0,
  }),

  actions: {
    async getAllExpenses(pageNumber, userId) {
      const page = await ExpenseService.getAllExpenses(pageNumber, userId);
      this.expenses = page.content;
      this.pages = page.totalPages;
    },
    async getExpensesReport(userId, duration) {
      const response = await ExpenseService.getExpensesReport(userId, duration);
      return response;
    },
    async exportExpenseAsPDF(userId, type) {
      const response = await ExpenseService.exportExpenseAsPDF(userId, type);
      return response;
    },
    async addExpense(emp) {
      const expense = await ExpenseService.addExpense(emp);
      if (expense) {
        this.expenses.push(expense);
      }
      return expense;
    },

    async updateExpense(expense) {
      const exp = await ExpenseService.updateExpense(expense);
      if (exp) {
        const index = this.expenses.findIndex((data) => data.id === expense.id);
        if (index !== -1) {
          this.expenses[index] = { ...expense };
        } else {
          this.error = "Employee not found";
        }
      }
      return exp;
    },
    async deleteExpense(id) {
      ExpenseService.deleteExpense(id);
      const index = this.expenses.findIndex((emp) => emp.id === id);
      this.expenses.splice(index, 1);
    },
    async searchExpenses(query) {
      const response = await ExpenseService.searchExpenses(query);
      this.expenses = response;
    },
  },
});
