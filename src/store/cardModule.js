export const cardModule = {
  state: () => ({
    contact: {},
    selectedSort: "",
    sortSelect: [
      { value: "kin", name: "родственники" },
      { value: "colleagues", name: "коллеги" },
    ],
  }),
  getters: {},
  mutations: {
    setContact(state, item) {
      state.contact = item;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
  },
  actions: {},
  namespaced: true
};
