<template>
  <TheHeader 
    msg="Список контактов" 
    :page="page" 
    :contact="contact.name" 
    @update:model-value="setPage"
  />
  <div class="wrapper">
    <div class="container container--flex">
      <MySelect 
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
      <AddContact />
    </div>
  </div>
  <div class="container">
    <ListContacts
      @update:model-value="setContact"
      @update:model-value1="setPage"
      @update:model-value2="setSelectedSortCard"
      :contacts="sortedContacts"
    />
  </div>
  <ItemContact
    v-if="contact.name !== undefined && page === 'create'"
    @update:model-value="setContacts"
    @update:model-value1="setPage"
    :contact="contact"
    :options="sortOptionsCard"
  />
  <NewContact
    v-if="page === 'add'"
    @update:model-value="setPage"
    :options="sortOptionsCard"
  />
  <MyNotifier 
    :msg="action === 'update' ? 'Контакт успешно изменён' : 
    action === 'delete' ? 'Контакт удалён' : 'Контакт успешно создан'" 
  />
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import MySelect from "@/components/UI/MySelect";
import MyNotifier from "@/components/UI/MyNotifier";
import AddContact from "@/components/UI/AddContact";
import ListContacts from "@/components/ListContacts";
import ItemContact from "@/components/ItemContact";
import NewContact from "@/components/NewContact";
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  name: "App",
  components: {
    TheHeader,
    MySelect,
    MyNotifier,
    AddContact,
    ListContacts,
    ItemContact,
    NewContact
  },
  methods: {
    ...mapMutations({
      setPage: "setPage",
      setSelectedSort: "contacts/setSelectedSort",
      setContacts: "contacts/setContacts",
      setContact: "card/setContact",
      setSelectedSortCard: "card/setSelectedSort",
    })
  },
  computed: {
    ...mapState({
      page: state => state.page,
      selectedSort: state => state.contacts.selectedSort,
      sortOptions: state => state.contacts.sortSelect,
      contacts: state => state.contacts.contacts,
      contact: state => state.card.contact,
      sortOptionsCard: state => state.card.sortSelect,
      notifier: state => state.notifier,
      action: state => state.action,
    }),
    ...mapGetters({
      sortedContacts: 'contacts/sortedContacts',
    })
  },
};
</script>

<style lang="scss">
.wrapper {
  display: flex;
  align-items: center;
  height: 58px;
  border: 1px solid #eaf2fd;
  background: #f9fcff;
}

.container {
  width: 990px;
  margin: 0 auto;
  
  &--flex {
    display: flex;justify-content: space-between;
  }
}

@media(max-width: 1199px) {
  .container {
    margin: 0 auto;
    padding: 0 32px;
  }
}

@media(max-width: 992px) {
  .container {
    width: 100%;
    margin: 0;
  }
}

@media(max-width: 768px) {
  .wrapper {
    height: 50px;
  }
}

@media(max-width: 576px) {
  .container {
    padding: 0 12px;
  }
}
</style>
