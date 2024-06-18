<template>
  <button id="scrollToTop" @click="scrollToTop">
    <v-icon name="bi-arrow-up" scale="1.5"></v-icon>
  </button>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style lang="scss">
#scrollToTop {
  cursor: pointer;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background-color: var(--pointColor);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s;
}

#scrollToTop:hover {
  background-color: rgba(255, 0, 0, 0.7); /* 호버 시 배경색을 직접 지정 */
}
</style>
