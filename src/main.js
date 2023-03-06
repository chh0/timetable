import { createApp } from 'vue'
import { createStore } from 'vuex'
import './style.css'
import App from './App.vue'


// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      ViewLength: "周",
      Kinds: ["进行"],
      TasksWindowWidth: 300, // in px
      TaskHeight: 2.5, // in em
      // StartDate: new Date(new Date().setDate(new Date().getDate()-1)),
      StartDate: new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate()),
      Data: [],
      SortedData: []
    }
  },
  mutations: {
    ChangeViewLength (state, value) { state.ViewLength = value },
    ChangeKinds (state, value) { state.Kinds = value },
    ChangeTasksWindowWidth (state, value) { state.TasksWindowWidth = value },
    ChangeTaskHeight (state, value) { state.TaskHeight = value },
    ChangeStartDate (state, value) { state.StartDate = value },
    ChangeData (state, value) { state.Data = value },
    // ChangeSortedData (state, value) { state.SortedData = value },
    UpdateData (state) {
      let res = []
      for ( let i of state.Data ) if ( state.Kinds.indexOf(i.state.kind)>-1 ) res.push(i)
      state.SortedData = res
    }
  }
})


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


store.commit('ChangeData', getData())
store.commit('UpdateData')

const app = createApp(App)
app.use(store)
app.mount('#app')
