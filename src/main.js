import { createApp } from 'vue'
import { createStore } from 'vuex'
import axios from 'axios';
// import qs from 'qs'
import './style.css'
import App from './App.vue'

const getData = () => {
  return [
  {
      id: '2022-9-23-0-0-0',
      name:'test',
      duration:[['2022-9-23-0-0-0', '2023-6-24-0-0-0']],
      note:'this is just a test',
      state: {
        color:'#DD4714',
        order: 6,
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
  },
  {
      id: '2023-3-7-16-0-0',
      name:'test4',
      duration:[
          ['2023-3-7-18-0-0', '2023-3-7-24-0-0'],
          ['2023-3-8-8-0-0', '2023-3-8-19-0-0']
      ],
      note:'this is just a test4',
      state: {
        color:'#21FB90',
        order: 4,
        kind: '废弃'
      }
  },
  {
      id: '2023-3-7-0-0-0',
      name:'期中考试复习',
      duration:[
          ['2023-3-7-0-0-0', '2023-4-23-24-0-0'],
      ],
      note:'一门在4.23，后面一门在5.6',
      state: {
        color:'#1a92b3',
        order: 1,
        kind: '进行'
      }
  },
  {
      id: '2023-3-7-0-0-0',
      name:'期中考试复习',
      duration:[
          ['2023-3-7-0-0-0', '2023-4-23-24-0-0'],
      ],
      note:'一门在4.23，后面一门在5.6',
      state: {
        color:'#1a92b3',
        order: 1,
        kind: '进行'
      }
  },
  {
      id: '2023-3-7-0-0-0',
      name:'期中考试复习',
      duration:[
          ['2023-3-7-0-0-0', '2023-4-23-24-0-0'],
      ],
      note:'一门在4.23，后面一门在5.6',
      state: {
        color:'#1a92b3',
        order: 1,
        kind: '进行'
      }
  },
  {
      id: '2023-3-7-0-0-0',
      name:'期中考试复习',
      duration:[
          ['2023-3-7-0-0-0', '2023-4-23-24-0-0'],
      ],
      note:'一门在4.23，后面一门在5.6',
      state: {
        color:'#1a92b3',
        order: 1,
        kind: '进行'
      }
  },
  {
      id: '2023-3-7-0-0-0',
      name:'期中考试复习',
      duration:[
          ['2023-3-7-0-0-0', '2023-4-23-24-0-0'],
      ],
      note:'一门在4.23，后面一门在5.6',
      state: {
        color:'#1a92b3',
        order: 1,
        kind: '进行'
      }
  }
]}

// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      ViewLength: "周",
      ViewLengthOptions: ['半年','月', '半月','周','日'],
      Kinds: ["进行"],
      KindsOptions: ['进行','结束','废弃'],
      TasksWindowWidth: 300, // in px
      TaskHeight: 2.5, // in em
      // StartDate: new Date(new Date().setDate(new Date().getDate()-1)),
      StartDate: new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate()),
      Data: [],
      SortedData: [],
      StateColors: ['#00B626', '#41A8FF', '#6E0051'],
      NoteDisplay: false,
      Debug: false
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
    SortData (state) {
      let res = []
      for ( let i of state.Data ) if ( state.Kinds.indexOf(i.state.kind)>-1 ) res.push(i)
      res.sort((a,b)=>{return a.state.order - b.state.order})
      state.SortedData = res
    },
    ChangeNoteDisplay (state, value) { state.NoteDisplay = value },
    GetData (state){
      if (state.Debug) {
        state.Data = getData()
        let arr = state.Data.sort((a,b)=>{return a.state.order - b.state.order})
        state.SortedData = arr
        return
      }
      axios.get('http://127.0.0.1:3000/get', {})
        .then( (res) => {
          state.Data = Array(res.data)[0]
          let arr = state.Data.sort((a,b)=>{return a.state.order - b.state.order})
          state.SortedData = arr
          console.log(state.Data)
        })
        .catch( (err) => console.log(err) )
    },
    UpdateData (state) {
      if (state.Debug) return
      axios.post('http://127.0.0.1:3000/up', state.Data )
      .then( (res) => {
        console.log(res.data)
        state.Data = res.data
        let arr = state.Data.sort((a,b)=>{return a.state.order - b.state.order})
        state.SortedData = arr
      } )
      .catch( (err) => console.log(err) );
    }
  }
})


store.commit('GetData')
const app = createApp(App)
app.use(store)
app.mount('#app')
