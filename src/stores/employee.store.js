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
    employee: {
      data: {},
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
    async fetchAllEmployees() {
      try {
        const response = await ApiService.get(`/employees`);
        this.employees = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response.data;
      }
    },
    async createEmployee(payload) {
      try {
        const response = await ApiService.post(`/employees/create`, payload);
        this.employee = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response.data;
      }
    },
    async updateEmployee(payload) {
      try {
        const response = await ApiService.put(
          `/employees/update/${payload._id}`,
          payload.data
        );
        this.employee = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response.data;
      }
    },
    async deleteEmployee({ id }) {
      try {
        const response = await ApiService.delete(`/employees/delete/${id}`);
        this.employee = response.data;
        return true;
      } catch (error) {
        this.error = error.response.data;
      }
    },
  },
});
