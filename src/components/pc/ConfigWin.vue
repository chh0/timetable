<script setup>

import { useStore } from 'vuex'
const store1 = useStore()


const getTimeString = (date) => {
    let time = new Date(date-date.getTimezoneOffset()*60000)
    let str = JSON.parse(JSON.stringify(time)).substring(0, 16)
    return str

    // try{
    //     str = JSON.parse(JSON.stringify(time)).substring(0, 16)
    // } catch(e) {
    //     console.log('ERROR in JSON.parse')
    //     console.log(e)
    // } finally {
    //     // console.log("..." + str)
    //     return str
    // }
}

const MyDateToString = (date) => {
  return ('' + date.getFullYear() + '-' +
  (date.getMonth()+1) + '-' +
  date.getDate() + '-' +
  date.getHours() + '-' +
  date.getMinutes() + '-' +
  date.getSeconds() )
}


const TimeStrToDate = (str) => {
    // 2022-9-23-0-0-0
    let arr = str.split('-')
    // alert(year,month,day,hour,minute,second)
    return new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5],0)
}

const StringToMyStr = (str) => {
    if (!str) {
        console.log("ERR in getting time string! have resetted!")
        return MyDateToString(new Date)
    }
    let arr = str.split(/[-T:]/)
    return ''+arr[0]+'-'+arr[1]+'-'+arr[2]+'-'+arr[3]+'-'+arr[4]+'-0'
}

const ChangeTask = (Task, attr, attr1, attr2, value) => {
    if (['id', 'name', 'note'].indexOf(attr)>-1) {
        Task[attr] = value
    } else if (attr === 'state') {
        if (['color', 'order', 'kind'].indexOf(attr1)>-1) {
            Task[attr][attr1] = value
        } else {
            console.log('ERR: change on undefined attr1 of Task!')
        }
    } else if (attr === 'duration') {
        if (attr2 > 2) console.log('ERR: change on undefined duration index of Task!')
        else Task.duration[attr1][attr2] = value
    } else {
        console.log('ERR: change on undefined attr of Task!')
    }
    console.log(Task)
    return Task
}

const AddTaskDuration = (Task) => {
    Task.duration.push([
          MyDateToString(new Date),
          MyDateToString(new Date(new Date - 0 + 86400000))
    ])
    return Task
}

const DropTaskDuration = (Task, index) => {
    Task.duration.splice(index, 1)
    return Task
}

const print = ( e ) => { console.log(e) }

</script>

<template>

<div class="ConfigWin" v-if="store1.state.ShowConfigWin">
    <div class="ConfigWin-Win">
        <div class="ConfigWin-Win-CloseFit">
            <div class="ConfigWin-Win-Close"
                @click="store1.commit('ChangeShowConfigWin', false)">×</div>
        </div>
        <div class="ConfigWin-Win-Content">
            <div class="ConfigWin-Win-Content-Item ConfigWin-Win-Content-Item-ID">
                <span>项目ID: </span>
                <span>{{ store1.state.Task0.id }}</span>
            </div>
            <div class="ConfigWin-Win-Content-Item">
                <div>项目名称</div>
                <input type="text"
                :value="store1.state.Task0.name"
                @change="store1.commit('ChangeTask0', ChangeTask(store1.state.Task0, 'name', '', '', $event.currentTarget.value))" />
            </div>
            <div class="ConfigWin-Win-Content-Item"><!--  @load="this.$refs.a.value='2023-03-08T10:41'" -->
                <div>持续时间</div> 
                <div>
                    <div v-for="i in Array.from(Array(store1.state.Task0.duration.length), (v,k) =>k)">
                        <div class="ConfigWin-Win-Content-Item-Duration-Drop-Empty">-</div>
                        <input type="datetime-local" 
                        :value="getTimeString(TimeStrToDate(store1.state.Task0.duration[i][0]))"
                        @change="store1.commit('ChangeTask0', ChangeTask(store1.state.Task0, 'duration', i, 0, StringToMyStr($event.currentTarget.value)))" />
                        <span> - </span>
                        <input type="datetime-local"
                        :value="getTimeString(TimeStrToDate(store1.state.Task0.duration[i][1]))"
                        @change="store1.commit('ChangeTask0', ChangeTask(store1.state.Task0, 'duration', i, 1, StringToMyStr($event.currentTarget.value)))" />
                        <div :style="{'display':'inline'}">
                            <div v-if="i > 0"
                                class="ConfigWin-Win-Content-Item-Duration-Drop"
                                @click="store1.commit('ChangeTask0', DropTaskDuration(store1.state.Task0, i))"
                                >-</div>
                            <div v-else class="ConfigWin-Win-Content-Item-Duration-Drop-Empty">-</div>
                        </div>
                    </div>
                    <div>
                    <div
                        class="ConfigWin-Win-Content-Item-Duration-Add"
                        @click="store1.commit('ChangeTask0', AddTaskDuration(store1.state.Task0))"
                        >+</div>
                    </div>
                </div>
            </div>
            <div class="ConfigWin-Win-Content-Item">
                <div>备注信息</div>
                <div>
                    <input type="text"
                    :value="store1.state.Task0.note"
                    @change="store1.commit('ChangeTask0', ChangeTask(store1.state.Task0, 'note', '', '', $event.currentTarget.value))" />
                </div>
            </div>
            <div class="ConfigWin-Win-Content-Item">
                <div>显示颜色</div>
                <div class="ConfigWin-Win-Content-Item-Color">
                    <input type="color" class="ConfigWin-Win-Content-Item-Color-Box"
                    :value="store1.state.Task0.state.color"
                    @change="store1.commit('ChangeTask0', ChangeTask(store1.state.Task0, 'state', 'color', '', $event.currentTarget.value))" />
                    <div class="ConfigWin-Win-Content-Item-Color-Value"
                    >{{'当前颜色值：' + store1.state.Task0.state.color }}</div>
                </div>
            </div>
            <div class="ConfigWin-Win-Content-Item">
                <div class="ConfigWin-Win-Content-Item-State-Text">目前状态</div>
                    <div class="ConfigWin-Win-Content-Item-State">
                        <span :class=" store1.state.Task0.state.kind === '进行' ? 'ConfigWin-Win-Content-Item-State-Selection-Selected' : 'ConfigWin-Win-Content-Item-State-Selection'"
                        @click="store1.commit('ChangeTask0', ChangeTask(store1.state.Task0, 'state', 'kind', '', '进行'))"
                        >进行</span>
                        <span :class=" store1.state.Task0.state.kind === '结束' ? 'ConfigWin-Win-Content-Item-State-Selection-Selected' : 'ConfigWin-Win-Content-Item-State-Selection'"
                        @click="store1.commit('ChangeTask0', ChangeTask(store1.state.Task0, 'state', 'kind', '', '结束'))"
                        >结束</span>
                        <span :class=" store1.state.Task0.state.kind === '废弃' ? 'ConfigWin-Win-Content-Item-State-Selection-Selected' : 'ConfigWin-Win-Content-Item-State-Selection'"
                        @click="store1.commit('ChangeTask0', ChangeTask(store1.state.Task0, 'state', 'kind', '', '废弃'))"
                        >废弃</span>
                    </div>
            </div>
            <div class="ConfigWin-Win-Content-Item">
                <div class="ConfigWin-Win-Content-Item-Submit"
                @click="store1.state.Task0State === 'new' ? store1.commit('AddTask') : store1.commit('ModifyTask')">提交</div>
            </div>
        </div>
    </div>
</div>

</template>

<style scoped>

.ConfigWin {
    left: 0px;
    top: 0px;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
}

.ConfigWin-Win {
    width: 35em;
    margin: auto;
    margin-top: 3em;
    background-color: #ffffff;
    padding: 1em;
    box-shadow: 0.3em 0.3em 0.5em 0.1em #666666;
}

.ConfigWin-Win-CloseFit {
    display: flex;
    flex-direction: row-reverse;
}

.ConfigWin-Win-Content {
    font-size: 1.5em;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.ConfigWin-Win-Content-Item {
    width: 100%;
    /* border-bottom: solid 1px #cccccc; */
    padding: 0.3em;
}

.ConfigWin-Win-Content-Item-ID {
    color: #888888
}

.ConfigWin-Win-Content input {
    font-size: 1em;
    text-align: center;
    margin-top: 0.5em;
    border-radius: 0.3em;
    border: 1px solid #888888;
}

.ConfigWin-Win-Close {
    font-size: 2em;
    border: solid 1px #cccccc;
    left: 5em;
    color: #444444;
    width: 1.5em;
    height: 1.5em;
    text-align: center;
    border-radius: 50%;
    user-select: none;
    transition: 0.4s;
}

.ConfigWin-Win-Close:hover {
    background-color: #cccccc;
    transform: rotate(90deg);
}

.ConfigWin-Win-Content-Item-Duration-Drop {
    display: inline-block;
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
    border: 1px solid #cccccc;
    transition: 0.3s;
    user-select: none;
    margin-left: 0.3em;
}

.ConfigWin-Win-Content-Item-Duration-Drop-Empty {
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    transition: 0.3s;
    user-select: none;
    margin-left: 0.3em;
    border: 1px solid rgba(255,255,255,0);
    color: rgba(255, 255, 255, 0)
}

.ConfigWin-Win-Content-Item-Duration-Drop:hover {
    background-color: #cccccc;
}

.ConfigWin-Win-Content-Item-Duration-Add {
    border-radius: 50%;
    width: 1.5em;
    height: 1.5em;
    border: 1px solid #cccccc;
    transition: 0.3s;
    margin: auto;
    margin-top: 0.3em;
    user-select: none;
}

.ConfigWin-Win-Content-Item-Duration-Add:hover {
    background-color: #cccccc;
}

.ConfigWin-Win-Content-Item-State {
    margin: 0.3em;
    user-select: none;
    /* width: fit-content;
    margin: auto;
    margin-top: 0.6em;
    user-select: none; */
}

.ConfigWin-Win-Content-Item-State-Selection {
    margin-top: 0.2em;
    padding: 0.3em;
    border-radius: 0.3em;
    /* padding: 0.3em; */
}

.ConfigWin-Win-Content-Item-State-Selection-Selected {
    margin-top: 0.2em;
    padding: 0.3em;
    background-color: #cccccc;
    border-radius: 0.3em;
}

.ConfigWin-Win-Content-Item-State-Selection:hover {
    background-color: #eeeeee;
}

.ConfigWin-Win-Content-Item-State-Text {
    padding: 0.3em;
}

.ConfigWin-Win-Content-Item-Color-Box {
    width: 4em;
    height: 2em;
}

.ConfigWin-Win-Content-Item-Color-Value {
    margin-top: 0.3em;
    color: #888888;
    user-select: none;
}

.ConfigWin-Win-Content-Item-Submit {
    user-select: none;
    padding: 0.3em;
    padding-left: 1.5em;
    padding-right: 1.5em;
    margin: auto;
    width: fit-content;
    background-color: #5555dd;
    color: #ffffff;
    border-radius: 0.4em;
    transition: 0.3s;
}

.ConfigWin-Win-Content-Item-Submit:hover {
    background-color: #9999ff;
}



</style>
