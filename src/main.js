import { createApp } from 'vue'
import { createStore } from 'vuex'
import './style.css'
import App from './App.vue'


// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      count: 0,
      ViewLength: "周",
      Kinds: ["进行"],
      TasksWindowWidth: 300, // in px
      TaskHeight: 2.5, // in em
      // StartDate: new Date(new Date().setDate(new Date().getDate()-1)),
      StartDate: new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate()),
    }
  },
  mutations: {
    increment (state) { state.count++ },
    ChangeViewLength (state, value) { state.ViewLength = value },
    ChangeKinds (state, value) { state.Kinds = value },
    ChangeTasksWindowWidth (state, value) { state.TasksWindowWidth = value },
    ChangeTaskHeight (state, value) { state.TaskHeight = value }
  }
})

const app = createApp(App)
app.use(store)
app.mount('#app')
