<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    login() {
      this.$auth0.loginWithRedirect();
    },
    logout() {
      this.$auth0.logout({ returnTo: window.location.origin });
    },
  },
});
</script>

<template>
  <header class="header">
    <div class="header__logo">UdaShopper</div>
    <a v-if="$auth0.isAuthenticated.value" @click="logout">Logout</a>
    <a v-else @click="login">Login</a>
  </header>
</template>

<style scoped lang="scss">
.header {
  background-color: #252525;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.2rem 2rem;

  &__logo {
    font-size: 1.5em;
    font-weight: bold;
    color: #fff;
    padding: 0.5em 0;
  }
}
</style>
