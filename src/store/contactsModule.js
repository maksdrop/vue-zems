export const contactsModule = {
  state: () => ({
    contacts: [
      {
        id: 1,
        name: "Айтишник Данила",
        phone: "+7(987)654-78-09",
        email: "nelfeelingood@gmail.com",
        create: "22.09.23",
        createDate: "2023-09-22T05:09:41.041Z",
        category: "коллеги"
      },
      {
        id: 2,
        name: "Арендодатель Виктория",
        phone: "+7(987)654-78-10",
        email: "nelfeelingood@gmail1.com",
        create: "22.09.23",
        createDate: "2023-09-22T05:11:41.041Z",
        category: "коллеги"
      },
      {
        id: 3,
        name: "Двери Вадим",
        phone: "+7(987)654-78-11",
        email: "nelfeelingood@gmail2.com",
        create: "23.09.23",
        createDate: "2023-09-23T05:09:41.041Z",
        category: "коллеги"
      },
      {
        id: 4,
        name: "Брат Юра",
        phone: "+7(987)654-78-12",
        email: "nelfeelingood@gmail3.com",
        create: "24.09.23",
        createDate: "2023-09-24T05:09:41.041Z",
        category: "родственники"
      },
    ],
    selectedSort: "все",
    sortSelect: [
      { value: "all", name: "все" },
      { value: "kin", name: "родственники" },
      { value: "colleagues", name: "коллеги" },
    ],
  }),
  getters: {
    sortedContacts(state) {
      const contacts = [...state.contacts].filter((contact) => {
        if (state.selectedSort !== 'все') {
          return contact.category ===  state.selectedSort
        } else {
          return contact
        }
      })

      function sortByDate(a, b) {
        if (a.createDate < b.createDate) {
            return -1;
        }
        if (a.createDate > b.createDate) {
            return 1;
        }
        return 0;
      }
    
      const sorted = contacts.sort(sortByDate);
      return sorted
    },
  },
  mutations: {
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setContacts(state, contact) {
      state.contacts = [
        ...state.contacts.filter(el => el.id !== contact.id),
        contact
      ]
    },
    setContactsDelete(state, contact) {
      state.contacts = [...state.contacts.filter(el => el.id !== contact.id)];
    },
    setNewContacts(state, contact) {
      state.contacts = [...state.contacts, contact]
    },
  },
  actions: {},
  namespaced: true,
};
