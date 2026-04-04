<template>
  <Transition name="modal">
    <div v-if="modelValue" class="modal" @click.self="close">
      <div class="modal__content">
        <button class="modal__close" @click="close">&times;</button>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  modelValue: Boolean
});

const emit = defineEmits(['update:modelValue']);

const close = () => emit('update:modelValue', false);
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  font-family: "Brotesk", Helvetica, Arial, sans-serif;

  &__content {
    background-color: rgba(255, 255, 255, 0.95);
    padding: 30px;
    border-radius: 29px;
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;

    @media (max-width: 575px) {
      padding: 25px 20px;
      max-width: 95%;
    }
  }

  &__close {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 32px;
    background: none;
    border: none;
    cursor: pointer;
    color: #000;
    line-height: 1;
    padding: 5px;
    transition: color 0.3s ease;

    &:hover {
      color: #666;
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;

  .modal__content {
    transition: transform 0.3s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal__content {
    transform: translateY(50px);
  }
}
</style>
