<script setup>
import Pc from './components/Pc.vue'
import Mobile from './components/Mobile.vue'

function isPC () { return 1 }

</script>

<template>
  <div v-if="isPC()"><Pc /></div>
  <div v-else><Mobile /></div>
  <!-- {{ this.$store.commit('ChangeData', getData()) }}
  {{ this.$store.commit('ChangeSortedData', sortData(this.$store.state.Kinds, [], this.$store.state.Data)) }} -->
  <!-- {{ this.$store.state.SortedData }} -->
</template>

<style scoped>

</style>


<!-- 
<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
 -->
