import { createStore } from "vuex";
import { contactsModule } from "@/store/contactsModule";
import { cardModule } from "@/store/cardModule";
import { newContactModule } from "@/store/newContactModule";

export default createStore({
  state: {
    page: "contacts",
    notifier: false,
    action: "",
  },
  mutations: {
    setPage(state, name) {
      state.page = name;
    },
    setNotifier(state, bool) {
      state.notifier = bool;
    },
    setAction(state, name) {
      state.action = name;
    },
  },
  modules: {
    contacts: contactsModule,
    card: cardModule,
    newContact: newContactModule,
  },
});
