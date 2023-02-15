import { defineStore } from "pinia";
import ApiService from "@/services/api.service";

export const useSalaryStore = defineStore("SalaryStore", {
  id: "salary",
  state: () => ({
    salaries: {
      data: {
        results: [],
        total: null,
      },
    },
    error: null,
  }),
  getters: {
    getSalaries: (state) => state.salaries,
  },
  actions: {
    async fetchSalaries({ pageNumber, pageSize }) {
      try {
        const response = await ApiService.get(
          `/sallarys/paging/${pageNumber}/${pageSize}`
        );
        this.salaries = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response.data;
      }
    },
  },
});
