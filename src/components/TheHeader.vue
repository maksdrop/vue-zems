<template>
  <div class="header">
    <div class="header__container" v-if="page === 'contacts'">
      <img src="../assets/img/logo.svg" alt="Контакты">
      <h1>книга контактов</h1>
    </div>
    <div class="header__container header__container--center" 
      v-else-if="page === 'create' || page === 'add'"
    >
      <div class="header__block"
        v-if="page === 'create'"
      >
        <span class="header__block-letter">
            <span>{{ contact[0] }}</span>
        </span>
        <h1>{{ contact }}</h1>
      </div>
      <div class="header__block"
        v-else-if="page === 'add'"
      >
        <img src="../assets/img/contact.svg" alt="Контакт">
        <h1>Добавить контакт</h1>
      </div>
      <img
        class="header__close" 
        src="../assets/img/close.svg" 
        alt="Крестик"
        @click="closeModal('contacts')"
      >
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: "TheHeader",
  
  props: {
    page: String,
    contact: String,
  },
  methods: {
    ...mapMutations({
      setErrorSelect: "newContact/setErrorSelect",
    }),
    closeModal(name) {
      this.setErrorSelect(false)
      this.$emit('update:modelValue', name);
    }
  }
};
</script>

<style scoped lang="scss">
.header {
  background: #282828;

  &__container {
    position: relative;
    display: flex;
    align-items: center;
    max-width: 1920px;
    margin: 0 auto;
    height: 48px;
    padding-left: 48px;

    &--center {
      justify-content: center;
      padding-left: 0;
    }

    h1 {
      margin: 0;
      padding-left: 18px;
      font-size: 18px;
      font-weight: 700;
      color: #e0e0e0;
      text-transform: uppercase;
    }
  }

  &__block {
    display: flex;
    align-items: center;
    gap: 8px;

    &-letter {
      position: relative;
      display: flex;
      justify-content: center;
      width: 24px;

      &::after {
        content: '';
        position: absolute;
        z-index: 1;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 24px;
        height: 24px;
        background-color: #ffc700;
        border-radius: 54px;
      }

      span {
        position: relative;
        z-index: 3;
        font-size: 12px;
        font-weight: 700;
        color: #545454;
      }
    }

    h1 {
      padding-left: 0;
    }
  }

  &__close {
    position: absolute;
    right: 32px;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
}

@media(max-width: 1199px) {
  .header {
    &__container {
      padding-left: 32px;

      img {
        width: 32px;
        height: 24px;
      }

      h1 {
        padding-left: 8px;
        font-size: 14px;
      }
    }
  }
}

@media(max-width: 768px) {
  .header {
    &__container {
      height: 40px;
    }
  }
}

@media(max-width: 576px) {
  .header {
    &__container {
      padding-left: 12px;
    }
  }
}

@media(max-width: 376px) {
  .header__container {
    h1 {
      padding-left: 8px;
      font-size: 14px;
    }
  }
}
</style>
