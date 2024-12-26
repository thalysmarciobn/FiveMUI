import { defineStore } from "pinia";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useHud = defineStore("view", {
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      weather: 2,
      rainLevel: 0,
      windSpeed: 0,
      windDirecion: 0,
      hour: 0,
      minute: 0,
      second: 0,
    };
  },
  getters: {
    weatherState(state) {
      return state.weather
    },
    rainLevelState(state) {
      return state.rainLevel
    },
    windSpeedState(state) {
      return state.windSpeed
    },
    windDirectionState(state) {
      return state.windDirecion
    },
    hourState(state) {
      return state.hour
    },
    minuteState(state) {
      return state.minute
    },
    secondState(state) {
      return state.second
    }
  }
});
