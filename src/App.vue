<script>
//import HelloWorld from './components/HelloWorld.vue'
import { RouterView } from 'vue-router';
import HeaderComponent from './components/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    RouterView,
    HeaderComponent
}
}
</script>

<template>
  <div class="container">
  <HeaderComponent />
    <RouterView />
  </div>
</template>

<style>
.container {
  position: absolute;
  top: 25px;
}
</style>
