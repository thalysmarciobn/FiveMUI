import { defineStore } from "pinia"

export const useCreation = defineStore("creation", {
  state: () => {
    return {
      display: 'false',
    }
  },
  getters: {
    displayState(state) {
      return state.display
    },
  }
})
