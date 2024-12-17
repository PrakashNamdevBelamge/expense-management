import { defineStore } from "pinia";
import { UserService } from "@/services/UserService";

export const userStore = defineStore("userStore", {
  state: () => ({
    user: [],
  }),

  actions: {
    async validateUser(userRequest) {
      const userResponse = await UserService.validateUser(userRequest);
      if (userResponse) {
        this.user.push(userResponse);
      }
      return userResponse;
    },

    async addUser(userRequest) {
      const userResponse = await UserService.addUser(userRequest);
      return userResponse;
    },

    async updatePassword(userRequest) {
      const userResponse = await ExpenseService.updatePassword(userRequest);
      return userResponse;
    },
  },
});
