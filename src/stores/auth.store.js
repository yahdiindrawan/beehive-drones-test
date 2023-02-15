import { defineStore } from "pinia";
import ApiService from "@/services/api.service";
import { StorageService } from "@/services/storage.service";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: JSON.parse(localStorage.getItem("me")),
    error: null,
    returnUrl: null,
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    async login(payload) {
      try {
        const response = await ApiService.post("/auth/login", payload);
        this.user = response.data.data;
        this.error = null;
        StorageService.saveToken(response.data.data.token);
        StorageService.saveUser(response.data.data);
        return response;
      } catch (error) {
        console.log(error.response.data);
        this.error = error.response.data.message;
      }
    },
    logout() {
      this.user = this.error = null;
      StorageService.removeToken();
      StorageService.removeUser();
      ApiService.removeHeader();
      localStorage.clear();
    },
  },
});
