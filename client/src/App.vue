<script setup lang="ts">
import Header from "./components/Header.vue";
</script>

<template>
  <Header />
  <router-view />
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #181818;
  color: #a8a8a8;

  a {
    color: #a8a8a8;
    text-decoration: none;
    &:hover {
      color: #d9d9d9;
    }
    cursor: pointer;
  }

  button {
    background-color: #00997b;
    border: none;
    padding: 0.8rem 2rem;
    color: #fff;
    cursor: pointer;
  }

  input,
  textarea {
    padding: 0.5rem;
    width: 100%;
    box-sizing: border-box;
    background-color: transparent;
    border: 1px solid #4a4a4a;
    color: #fff;
  }
}
</style>
