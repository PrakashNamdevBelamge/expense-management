import { defineStore } from 'pinia'
import { ExpenseService } from '@/services/ExpenseService';

export const useExpenseStore = defineStore('expStore', {
    state: () => ({
        employees:[],
        pages:0
}),
      
      actions: {
        async getAllEmployees(pageNumber, userId) {

                const page = await ExpenseService.getAllExpenses(pageNumber, userId);
                this.employees = page.content;
                this.pages = page.totalPages;
        },
        async getExpensesReport(userId, type) {
            const response = await ExpenseService.getExpensesReport(userId, type);
            return response;
    },
        async addExpense(emp) {
           const employee =  await ExpenseService.addExpense(emp);
           debugger;
           if(employee){
           this.employees.push(employee);
           }
           return employee;
        },

        async updateExpense(expense) {
            const exp = await ExpenseService.updateExpense(expense);
            if(exp){
            const index = this.employees.findIndex((data) => data.id === expense.id);
            if (index !== -1) {
                this.employees[index] = { ...expense };
            } else {
                this.error = 'Employee not found';
            }
        }
        return exp;
        },
        async deleteExpense(id) {
            ExpenseService.deleteExpense(id);
            const index = this.employees.findIndex((emp) => emp.id === id);
            this.employees.splice(index,1);
        },
        async searchExpenses(query) {
              const response = await ExpenseService.searchExpenses(query)
             this.employees = response;
          }
      },
})