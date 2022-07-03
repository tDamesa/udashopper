<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__title">
        <slot name="title"></slot>
        <a @click="$emit('closed')">&#10006;</a>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    flex-basis: 0;
    background-color: #252525;
    margin: 2rem;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #181818;
    padding: 1rem 1.5rem;
  }
}
</style>
