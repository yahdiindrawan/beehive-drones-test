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
    salary: {
      data: {},
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
    async createSalary(payload) {
      try {
        const response = await ApiService.post(`/sallarys/create`, payload);
        this.salary = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response.data;
      }
    },
    async updateSalary(payload) {
      try {
        const response = await ApiService.put(
          `/sallarys/update/${payload._id}`,
          payload.data
        );
        this.salary = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response.data;
      }
    },
    async deleteSalary({ id }) {
      try {
        const response = await ApiService.delete(`/sallarys/delete/${id}`);
        this.salary = response.data;
        return true;
      } catch (error) {
        this.error = error.response.data;
      }
    },
  },
});
