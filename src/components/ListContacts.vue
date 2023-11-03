<template>
  <div class="contacts">
    <div class="contacts__headers">
      <span>контакт</span>
      <div class="contacts__headers-phone">
        <span>телефон</span>
        <span>e-mail</span>
      </div>
      <span class="contacts__headers--right">создан</span>
    </div>
    <div class="contacts__list">
      <div 
        class="contacts__item"
        v-for="contact in contacts"
        :key="contact.id"
        @click="openContact(contact)"
      >
      <div class="contacts__item-name">
        <span class="contacts__item-letter">{{ contact.name[0] }}</span>
        <span class="contacts__item-name--width">{{ contact.name }}</span>
      </div>
      <div class="contacts__item-phone">
        <span>{{ contact.phone }}</span>
        <span>{{ contact.email }}</span>
      </div>
        <span class="contacts__item-create">{{ contact.create }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListContacts",

  props: {
    contacts: {
      type: Array,
    }
  },
  methods: {
    openContact(contact) {
      this.$emit('update:modelValue', contact);
      this.$emit('update:modelValue1', "create");
      this.$emit('update:modelValue2', contact.category);
    }
  }
}
</script>

<style lang="scss" scoped>
.contacts {

  &__headers {
    display: grid;
    grid-template-columns: 296px 408px 112px;
    justify-content: space-between;
    padding-top: 12px;

    &--right {
      text-align: end;
    }

    &-phone {
      display: grid;
      grid-template-columns: 112px 208px;
      justify-content: space-between;
    }

    span {
      font-size: 10px;
      line-height: 24px;
      text-transform: uppercase;
      color: #b5b5b5;
    }
  }

  &__item {
    display: grid;
    grid-template-columns: 296px 408px 112px;
    justify-content: space-between;
    align-items: center;
    height: 48px;
    color: #545454;
    border-bottom: 1px solid #eaf3fd;
    box-sizing: content-box;
    cursor: pointer;
    transition: opacity 500ms ease;

    &:hover {
      opacity: 0.8;
    }

    &-name {
      display: inline-flex;
      gap: 12px;
      line-height: 160%;
    }

    &-letter {
      position: relative;
      display: flex;
      justify-content: center;
      width: 24px;

      &::after {
        content: '';
        position: absolute;
        z-index: -1;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 24px;
        height: 24px;
        background-color: #ffc700;
        border-radius: 54px;
      }
    }

    &-phone {
      display: grid;
      grid-template-columns: 112px 208px;
      justify-content: space-between;
      font-size: 12px;
    }

    &-create {
      text-align: end;
    }

    &-size {
      &--min {
        font-size: 12px;
      }
    }
  }
}

@media(max-width: 900px) {

  .contacts__headers {
    grid-template-columns: 220px minmax(max-content, 370px) 80px;
    gap: 8px;

    &-phone {
      grid-template-columns: 112px 180px;
    }
  }

  .contacts__item {
    grid-template-columns: 220px minmax(max-content, 370px) 80px;
    gap: 8px;

    &-phone {
      grid-template-columns: 112px 180px;
    }

    &-name {
      align-items: center;
      font-size: 12px;
    }

    &-create {
      font-size: 12px;
    }
  }
}

@media(max-width: 720px) {
  .contacts__headers {

    &-phone {
      display: flex;
      justify-content: flex-start;

      span:first-child::after {
        content: '/';
        padding: 0 4px;
      }
    }
  }

  .contacts__item {
    &-phone {
      display: flex;
      flex-direction: column;
      gap: 2px;
      line-height: 16px;
    }

    &-name {
      &--width {
        max-width: 100px;
      }
    }
  }
}

@media(max-width: 570px) {
  .contacts__headers {
    grid-template-columns: 143px 143px 58px;
    gap: 4px;
  }
  .contacts__item {
    grid-template-columns: 143px 143px 58px;
    gap: 4px;

    &-letter {
      display: none;
    }
  }
}
</style>
