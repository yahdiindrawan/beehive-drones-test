import { defineStore } from "pinia";
import ApiService from "@/services/api.service";

export const usePositionStore = defineStore("PositionStore", {
  id: "position",
  state: () => ({
    positions: {
      data: {
        results: [],
        total: null,
      },
    },
    position: {
      data: {},
    },
    error: null,
  }),
  getters: {
    getPositions: (state) => state.positions,
  },
  actions: {
    async fetchPositions({ pageNumber, pageSize }) {
      try {
        const response = await ApiService.get(
          `/positions/paging/${pageNumber}/${pageSize}`
        );
        this.positions = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response.data;
      }
    },
    async fetchAllPositions() {
      try {
        const response = await ApiService.get(`/positions`);
        this.positions = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response.data;
      }
    },
    async createPosition(payload) {
      try {
        const response = await ApiService.post(`/positions/create`, payload);
        this.position = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response.data;
      }
    },
    async updatePosition(payload) {
      try {
        const response = await ApiService.put(
          `/positions/update/${payload._id}`,
          payload.data
        );
        this.position = response.data;
        return response.data;
      } catch (error) {
        this.error = error.response.data;
      }
    },
    async deletePosition({ id }) {
      try {
        const response = await ApiService.delete(`/positions/delete/${id}`);
        this.position = response.data;
        return true;
      } catch (error) {
        this.error = error.response.data;
      }
    },
  },
});
