<script setup>
import Pc from './components/Pc.vue'
import Mobile from './components/Mobile.vue'

function isPC () { return 1 }

const getData = () => {
    return [
    {
        id: '2022-9-23-0-0-0',
        name:'test',
        duration:[['2022-9-23-0-0-0', '2023-6-24-0-0-0']],
        note:'this is just a test',
        state: {
          color:'#DD4714',
          order: 1,
          kind: '结束'
        }
    },
    {
        id: '2023-3-5-18-0-0',
        name:'test2',
        duration:[['2023-3-3-18-0-0', '2023-3-18-19-0-0']],
        note:'this is just a test2',
        state: {
          color:'#5847EA',
          order: 2,
          kind: '进行'
        }
    },
    {
        id: '2023-3-5-16-0-0',
        name:'test3',
        duration:[
            ['2023-3-7-18-0-0', '2023-3-7-24-0-0'],
            ['2023-3-6-2-0-0', '2023-3-6-8-0-0']
        ],
        note:'this is just a test3',
        state: {
          color:'#21FB90',
          order: 3,
          kind: '进行'
        }
    }
]}


const sortData = (Kinds, Order, Data) => {
  let res = []
  for ( let i of Data ) if ( Kinds.indexOf(i.state.kind)>-1 ) res.push(i)
  return res
}
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
