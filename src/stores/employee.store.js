import { defineStore } from "pinia";
import ApiService from "@/services/api.service";

export const useEmployeeStore = defineStore("EmployeeStore", {
  id: "employee",
  state: () => ({
    employees: {
      data: {
        results: [],
        total: null,
      },
    },
    error: null,
  }),
  getters: {
    getEmployees: (state) => state.employees,
  },
  actions: {
    async fetchEmployees({ pageNumber, pageSize }) {
      try {
        const response = await ApiService.get(
          `/employees/paging/${pageNumber}/${pageSize}`
        );
        this.employees = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response.data;
      }
    },
  },
});
