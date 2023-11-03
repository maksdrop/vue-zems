<template>
  <div v-if="this.notifier" class="notifier">
    <img src="../../assets/img/success.svg" alt="Успешно" />
    <span>{{ msg }}</span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: "MyNotifier",

  props: {
    msg: {
      type: String,
    }
  },

  methods: {
    ...mapMutations({
      setPage: "setPage",
      setNotifier: "setNotifier"
    }),
  },
  computed: {
    ...mapState({
      notifier: state => state.notifier,
    }),
  },
}
</script>

<style scoped lang="scss">
.notifier {
  position: absolute;
  left: 32px;
  bottom: 48px;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 12px 12px 12px 8px;
  border-radius: 4px;
  box-shadow: 0px 0px 16px 0px rgba(176, 197, 222, 0.50);

  span {
    font-size: 12px;
    line-height: 160%;
    color: #545454;
  }
}

@media(max-width: 450px) {
  .button-hidden {
    display: none;
  }
}
</style>
