<script setup>
  import { vMask } from "@opentf/vue-input-mask";
</script>

<template>
  <div class="card">
    <div class="card__container">
      <div class="card__form">
        <h3 class="card__form-title">Контакт</h3>
        <div class="card__form-info">
          <div class="card__form-input">
            <p>Имя</p>
            <input
              :class="[this.errorName.error ? 'error' : '']"
              :value="newContact.name"
              @input="handleChangeName($event)"
              type="text"
              placeholder="Например “Андрей...”"
            >
            <span v-if="this.errorName.error" class="error__img"></span>
            <span v-if="this.errorName.error" class="error__message">
              {{ this.errorName.message }}
            </span>
          </div>
          <div class="card__form-input">
            <p>Телефон</p>
            <input
              :class="[this.errorPhone.error ? 'error' : '']"
              :value="newContact.phone"
              @input="handleChangePhone($event)"
              @keydown="onPressEnter($event)"
              type="text"
              v-mask="{ mask: newContact.phone[1] === '7' ? '+#(###)###-##-##' : '+7(###)###-##-##'}"
            >
            <span v-if="this.errorPhone.error" class="error__img"></span>
            <span v-if="this.errorPhone.error" class="error__message">
              {{ this.errorPhone.message }}
            </span>
          </div>
          <div class="card__form-input">
            <p>E-mail</p>
            <input
              :class="[this.errorEmail.error ? 'error' : '']"
              :value="newContact.email"
              @input="handleChangeEmail($event)"
              type="text"
              placeholder="Например «pochta@domain.ru»..."
            >
            <span v-if="this.errorEmail.error" class="error__img"></span>
            <span v-if="this.errorEmail.error" class="error__message">
              {{ this.errorEmail.message }}
            </span>
          </div>
          <div class="card__form-input">
            <p>Категория</p>
            <MySelect
              :model-value="selectedSort"
              @update:model-value="setSelectedSort"
              :options="options"
            />
            <!-- <input :value="contact.category" type="text"> -->
          </div>
          <div class="card__form-input">
            <p>Создан</p>
            <span class="card__form-create">{{ newContact.create }}</span>
          </div>
        </div>
        <div class="card__form-buttons">
          <button class="save" type="submit"
            @click="updateContact"
          >
            <img v-if="pending" src='../assets/img/pending.svg' alt="Сохранение">
            <img v-else src='../assets/img/save.svg' alt="Сохранить">
            Сохранить
          </button>
          <button class="delete" type="button"
            @click="deleteContact"
          >
            <img src="../assets/img/delete.svg" alt="Удалить">
            Удалить контакт
          </button>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import MySelect from "@/components/UI/MySelect";
import { mapState, mapMutations } from 'vuex';

export default {
  name: "ItemContact",

  components: {
    MySelect
  },
  data() {
    return {
      errorName: {
        error: false,
        message: "Слишком короткое поле"
      },
      errorPhone: {
        error: false,
        message: "Некорректный номер"
      },
      errorEmail: {
        error: false,
        message: "Некорректный e-mail"
      },
      errorCategory: {
        error: false,
        message: "Поле не может быть пустым"
      },
      newContact: {
        id: this.contact.id,
        name: this.contact.name,
        phone: this.contact.phone,
        email: this.contact.email,
        category: this.contact.category,
        create: this.contact.create,
        createDate: this.contact.createDate
      },
      pending: false,
    }
  },
  props: {
    contact: {
      type: Object,
    },
    options: {
      type: Array
    }
  },
  methods: {
    ...mapMutations({
      setSelectedSort: "card/setSelectedSort",
      setContactsDelete: "contacts/setContactsDelete",
      setNotifier: "setNotifier",
      setAction: "setAction"
    }),
    onPressEnter(event) {
      const check = /[0-9]/.test(event.target.value[3])
      if (event.key === "Backspace" && !check) {
        event.preventDefault();
      }
    },
    handleChangeName(event) {
      if (event.target.value.length <= 3) {
        this.errorName.error = true
      } else {
        this.errorName.error = false
      }
      this.newContact.name = event.target.value;
    },
    handleChangePhone(event) {
      const check = /[0-9]/.test(event.target.value[3])
      if (!check) {
        this.errorPhone.error = true
      } else {
        this.errorPhone.error = false
      }
      this.newContact.phone = event.target.value;
    },
    handleChangeEmail(event) {
      // eslint-disable-next-line
      const varif = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        .test(event.target.value)
      if (!varif) {
        this.errorEmail.error = true
      } else {
        this.errorEmail.error = false
      }
      this.newContact.email = event.target.value;
    },
    updateContact() {
      this.newContact.category = this.selectedSort

      if (!this.errorName.error && !this.errorPhone.error && !this.errorEmail.error) {
        this.pending = true;
        setTimeout(() => {
          this.pending = false;
          this.setNotifier(true);
          this.setAction("update")
          this.$emit('update:modelValue', this.newContact);
          this.$emit('update:modelValue1', "contacts");
        }, 3000);
        setTimeout(() => {
          this.setNotifier(false);
        }, 6000);
      }
    },
    deleteContact() {
      this.setContactsDelete(this.contact)
      this.$emit('update:modelValue1', "contacts");
      this.setNotifier(true);
      this.setAction("delete")
      setTimeout(() => {
        this.setNotifier(false);
      }, 3000);
    },
  },
  computed: {
    ...mapState({
      selectedSort: state => state.card.selectedSort,
    })
  }
}
</script>

<style lang="scss" scoped>
.card {
  position: absolute;
  top: 48px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  background: #f9fcff;

  &__container {
    max-width: 704px;
    margin: 0 auto;
    padding-top: 24px;
  }

  &__form {
    padding: 48px 64px 64px 64px;
    background: #ffffff;
    box-shadow: 0px 0px 6px 0px rgba(148, 181, 225, 0.35);

    &-title {
      margin: 0;
      margin-bottom: 24px;
      font-size: 32px;
      font-weight: 700;
      color: #545454;
    }

    &-info {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    &-input {
      position: relative;
      display: flex;
      align-items: center;

      p {
        min-width: 136px;
        margin: 0;
        margin-right: 32px;
        font-size: 14px;
        font-weight: 700;
        color: #545454;
      }

      input {
        width: 100%;
        padding: 8px;
        border: 1px solid #dddddd;
        border-radius: 4px;
        font-size: 14px;
        line-height: 24px;
        color: #545454;
        box-sizing: content-box;

        &:focus {
          outline: none;
          border-color: #2f80ed;
        }
      }
    }

    &-create {
      padding-left: 7px;
      font-size: 14px;
      color: #545454;
    }

    &-buttons {
      display: flex;
      gap: 24px;
      padding-top: 32px;
      padding-left: 168px;

      button {
        border: 0;
        background: transparent;
        cursor: pointer;
      }

      .save {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 12px 16px;
        font-size: 14px;
        font-weight: 700;
        line-height: 120%;
        color: #545454;
        background-color: #ffc700;
        border-radius: 4px;
        transition: background-color 500ms ease;

        &:hover {
          background-color: #ffd84c;
        }

        &:active {
          background-color: #ffc700;
        }
      }

      .delete {
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 12px;
        color: #2f80ed;
        transition: opacity 500ms ease;

        &:hover {
          opacity: 0.7;
        }
      }
    }
  }
}

.error {
  position: relative;
  color: #eb5757 !important;
  border-color: #eb5757 !important;

  &:focus {
    color: #545454 !important;
    border-color: #2f80ed !important;

    &::placeholder {
      color: #545454 !important;
    }

    & + .error__img::after {
      content: none;
    }

    & ~ .error__message {
      display: none;
    }
  }

  &::placeholder {
    color: #eb5757;
  }

  & + .error__img {

    &::after {
      content: '';
      position: absolute;
      right: 8px;
      top: 15px;
      display: block;
      width: 16px;
      height: 16px;
      background-image: url('../assets/img/error.svg');
      background-repeat: no-repeat;
    }
  }

  & ~ .error__message {
    position: absolute;
    right: 0;
    bottom: -14px;
    font-size: 10px;
    color: #eb5757;
  }
}

@media(max-width: 768px) {
  .card {
    position: absolute;
    top: 40px;
  }
  .card__form {
    padding: 32px 48px 48px 48px;

    &-title {
      font-size: 24px;
    }

    &-input {
      p {
        font-size: 12px;
      }

      input {
        font-size: 12px;
      }
    }

    &-buttons {
      .save {
        font-size: 12px;
      }
    }
  }
}

@media(max-width: 540px) {
  .card__form {
    &-buttons {
      padding-left: 30px;
    }

    &-input {
      p {
        min-width: 72px;
        margin-right: 12px;
      }
    }
  }
}
</style>
