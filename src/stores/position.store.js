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
  },
});
