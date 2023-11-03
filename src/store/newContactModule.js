export const newContactModule = {
  state: () => ({
    selectedSort: "Не выбрано",
    errorSelect: false
  }),
  getters: {},
  mutations: {
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setErrorSelect(state, bool) {
      state.errorSelect = bool;
    },
  },
  actions: {},
  namespaced: true,
};
