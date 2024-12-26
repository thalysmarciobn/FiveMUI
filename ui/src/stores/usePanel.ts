import { defineStore } from "pinia";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const usePanel = defineStore("panel", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      display: 'false',
    };
  },
  getters: {
    displayState(state) {
      return state.display
    },
  }
});
