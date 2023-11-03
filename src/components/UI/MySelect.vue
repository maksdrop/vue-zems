<template>
  <div :class="[page === 'create' || page === 'add'  ? 'select__card' : '' , 'select']">
    <div 
      :class="[this.errorSelect && errorSel === true ? 'error' : '',
        page === 'create' || page === 'add' ? 'select__button-form' : '',
        'select__button']"
      :value="modelValue" 
      @click="showList"
    >
      <span :class="[this.modelValue === 'Не выбрано' && page === 'add' ? 'select__placeholder' : '']">
        {{ modelValue }}
      </span>
      <img :class="[this.errorSelect && errorSel === true ? 'select__arrow' : '']"  src="../../assets/img/array.svg" alt="Стрелка">
      <span v-if="this.errorSelect && errorSel === true" class="error__img"></span>
      <span v-if="this.errorSelect && errorSel === true" class="error__message">
        {{ this.errorMessageSelect }}
      </span>
    </div>
    <ul class="select__options" v-if="showSelect">
      <li
        :class="[modelValue == option.name ? 'select__active' : '']"
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        @click="changeOption(option.name)"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MySelect',

  data() {
    return {
      showSelect: false,
      errorMessageSelect: "Поле не может быть пустым",
      errorSel: true
    }
  },
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
    },
  },
  methods: {
    changeOption(name) {
      this.errorSel = false
      this.showList()
      this.$emit('update:modelValue', name);
    },
    showList() {
      this.showSelect = !this.showSelect
    }
  },
  computed: {
    ...mapState({
      page: state => state.page,
      errorSelect: state => state.newContact.errorSelect,
    })
  }
}
</script>

<style scoped lang="scss">
.select {
  position: relative;
  width: 236px;

  &__card {
    width: 100%;
  }

  &__button {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 8px;
    padding: 10px 8px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 700;
    line-height: 20px;
    text-transform: uppercase;
    color: #545454;

    &:hover {
      font-weight: 400;
      border-color: #2f80ed;
      cursor: pointer;
    }

    &-form {
      padding: 8px;
      transition: border-color 500ms ease;
    }
  }

  &__placeholder {
    font-weight: 400;
    text-transform: none;
    color: #a9a9a9;
  }

  &__options {
    position: absolute;
    z-index: 2;
    top: 50px;
    width: 100%;
    margin: 0;
    padding-left: 0;
    list-style-type: none;
    border-radius: 4px;
    background: #ffffff;
    box-shadow: 0px 0px 6px 0px rgba(148, 181, 225, 0.35);

    li {
      padding: 10px 8px 10px 16px;
      font-size: 14px;
      line-height: 20px;
      text-transform: uppercase;
      color: #545454;
      border-bottom: 1px solid #eaf2fd;
      transition: background-color 700ms ease;

      &:last-child {
        border-bottom: 0;
      }

      &:hover {
        background-color: #eaf2fd;
        cursor: pointer;
      }
    }
  }

  &__arrow {
    position: absolute;
    right: 8px;
  }

  &__active {
    position: relative;
    font-weight: 700;

    &::after {
      content: '';
      position: absolute;
      top: 12px;
      right: 8px;
      display: block;
      background-image: url("../../assets/img/check.svg");
      height: 16px;
      width: 16px;
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

  & > .error__img {

    &::after {
      content: '';
      position: absolute;
      right: 8px;
      top: 15px;
      display: block;
      width: 16px;
      height: 16px;
      background-image: url('../../assets/img/error.svg');
      background-repeat: no-repeat;
    }
  }

  & > .error__message {
    position: absolute;
    right: 0;
    bottom: -19px;
    font-size: 10px;
    font-weight: 400;
    text-transform: none;
    color: #eb5757;
  }
}

@media(max-width: 768px) {
  .select__button-form {
    font-size: 12px;
  }
}

@media(max-width: 576px) {
  .select__button {
    padding: 6px 8px;

    &-form {
      padding: 8px;
    }
  }
}

@media(max-width: 450px) {
  .select {
    width: 221px;
  }
}
</style>
