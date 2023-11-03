<template>
  <div class="button" @click="openPage">
    <img src="../../assets/img/plus.svg" alt="Плюс">
    <span>добавить <span class="button-hidden">контакт</span></span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: "AddContact",

  methods: {
    ...mapMutations({
      setPage: "setPage",
    }),
    openPage() {
      this.setPage("add");
    }
  },
}
</script>

<style scoped lang="scss">
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 8px 16px;
  border: 1px solid #2f80ed;
  border-radius: 28px;
  cursor: pointer;
  transition: opacity 500ms ease;
  
  &:hover {
    opacity: 0.7;
  }

  span {
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
    text-transform: uppercase;
    color: #2F80ED;
  }
}

@media(max-width: 450px) {
  .button-hidden {
    display: none;
  }
}
</style>
