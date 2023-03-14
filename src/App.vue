<script>
//import HelloWorld from './components/HelloWorld.vue'
import { RouterView } from 'vue-router';

export default {
  name: 'App',
  components: {
    RouterView
  }
}
</script>

<template>
  <ul>
    <li>
      <RouterLink to="/">Connection</RouterLink>
      <RouterLink to="/lights">Lights</RouterLink>
      <RouterLink to="/midi">MIDI</RouterLink>
    </li>
  </ul>
  <RouterView />
</template>

<style>

</style>
