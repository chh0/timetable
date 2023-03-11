<script setup>

import SelectButton from './item/SelectButton.vue';
import MulSelectButton from './item/MulSelectButton.vue';

const getLastMonth = (date) => {
    return new Date(
        date.getFullYear(),date.getMonth()-1, date.getDate(), date.getHours(), 
        date.getMinutes(), date.getSeconds()
    );
}
const getNextMonth = (date) => {
    return new Date(
        date.getFullYear(),date.getMonth()+1, date.getDate(), date.getHours(), 
        date.getMinutes(), date.getSeconds()
    );
}
const getLastDay = (date) => {
    return new Date(
        date.getFullYear(),date.getMonth(), date.getDate()-1, date.getHours(), 
        date.getMinutes(), date.getSeconds()
    );
}
const getNextDay = (date) => {
    return new Date(
        date.getFullYear(),date.getMonth(), date.getDate()+1, date.getHours(), 
        date.getMinutes(), date.getSeconds()
    );
}

const getToday = () => {
    let date = new Date()
    return new Date(
        date.getFullYear(),date.getMonth(), date.getDate()
    );
}

const print = (e) => { console.log(e) }

</script>

<template>

<div class="Menu">
    <div class="Menu-Left">
        <span class="Menu-Today"
            @click="this.$store.commit('ChangeStartDate', getToday())"
        > 今日:{{(new Date()).getFullYear()}}-{{(new Date()).getMonth()+1}}-{{(new Date()).getDate()}}
        </span>
        <span class="Menu-StartDay">
            <span
            @click="this.$store.commit('ChangeStartDate', getLastMonth(this.$store.state.StartDate))"
            >≪</span><span
            @click="this.$store.commit('ChangeStartDate', getLastDay(this.$store.state.StartDate))"
            >&lt;</span>{{(this.$store.state.StartDate).getFullYear()}}-{{
            (this.$store.state.StartDate).getMonth()+1 > 9 ? (this.$store.state.StartDate).getMonth()+1 : '0' + ((this.$store.state.StartDate).getMonth()+1)}}-{{
            (this.$store.state.StartDate).getDate() > 9 ? (this.$store.state.StartDate).getDate() : '0' + (this.$store.state.StartDate).getDate()}}<span
            @click="this.$store.commit('ChangeStartDate', getNextDay(this.$store.state.StartDate))"
            >&gt;</span><span
            @click="this.$store.commit('ChangeStartDate', getNextMonth(this.$store.state.StartDate))"
            >≫</span>
        </span>
        <SelectButton :selections="this.$store.state.ViewLengthOptions" />
        <MulSelectButton :selections="this.$store.state.KindsOptions" />
        <span 
        :class="this.$store.state.NoteDisplay ? 'Menu-Note-Clicked' : 'Menu-Note'"
        @click="
        this.$store.commit('ChangeNoteDisplay', !(this.$store.state.NoteDisplay))">备注</span>
    </div>
    <div class="Menu-Right">
        <span class="Menu-Span" @click="this.$store.commit('ToAddTask')">
            <img src="../../assets/svg/新建.svg" class="Menu-Icon Menu-Icon-New" draggable="false" />
        </span>
        <span class="Menu-Span" @click="!!(this.$store.state.SelectedTask) ? this.$store.commit('ToModTask') : print('No selected yet')">
            <img src="../../assets/svg/编辑.svg" class="Menu-Icon Menu-Icon-Edit" draggable="false" />
        </span>
        <!-- <span class="Menu-Span">
            <img src="../../assets/svg/完成.svg" class="Menu-Icon Menu-Icon-Finished" draggable="false" />
        </span> -->
        <span class="Menu-Span" @click="!!(this.$store.state.SelectedTask) ? this.$store.commit('DelTask') : print('No selected yet')">
            <img src="../../assets/svg/删除.svg" class="Menu-Icon Menu-Icon-Delete" draggable="false" />
        </span>
        <span class="Menu-Span" @click="!!(this.$store.state.SelectedTask) ? this.$store.commit('UpMoveTask') : print('No selected yet')">
            <img src="../../assets/svg/向上.svg" class="Menu-Icon Menu-Icon-Up" draggable="false" />
            </span>
        <span class="Menu-Span" @click="!!(this.$store.state.SelectedTask) ? this.$store.commit('DownMoveTask') : print('No selected yet')">
            <img src="../../assets/svg/向下.svg" class="Menu-Icon Menu-Icon-Down" draggable="false" />
        </span>
        </div>
</div>

</template>
    
<style scoped>

.Menu {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;


    height: 3em;
    background-color: #ffffff;
    box-shadow: 0 0 0.2em 0.2em #eeeeee;
    display: flex;
    justify-content: space-between;
}

.Menu-Left .Menu-Right {
    display: inline-block;
}

.Menu-Left {
    padding-left: 1em;
    display:flex;
    align-items:center;
    /* background-color: blue; */
}

.Menu-Right {
    padding-left: 1em;
    display:flex;
    align-items:center;
}

.Menu-Today {
    margin-right: 0.5em;
    font-size: 1.5em;
    background-color: #eeeeee;
    padding: 0.2em;
    border-radius: 0.4em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    cursor: default;
    user-select: none;
}

.Menu-Today:hover {
    background-color: #cccccc;
}

.Menu-StartDay {
    margin-right: 0.5em;
    font-size: 1.5em;
    background-color: #eeeeee;
    padding: 0.2em;
    border-radius: 0.4em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    cursor: default;
    user-select: none;
}

.Menu-StartDay span:hover {
    background-color: #cccccc;
}

.Menu-Span{
    display: inline-block;
    margin: 0.2em;
    padding: 0.3em;
    border-radius: 50%;
    /* background-color: blue; */
    margin-right: 1em;
    transition: 0.3s;
}

.Menu-Span:hover {
    background-color: #eeeeee;
}

.Menu-Icon {
    width: 2em;
    height: 2em;
}

.Menu-Note {
    margin-right: 0.5em;
    font-size: 1.5em;
    background-color: #eeeeee;
    padding: 0.2em;
    border-radius: 0.4em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    cursor: default;
    user-select: none;
}

.Menu-Note:hover {
    background-color: #cccccc;
}

.Menu-Note-Clicked {
    margin-right: 0.5em;
    font-size: 1.5em;
    color: #ffffff;
    background-color: #434978;
    padding: 0.2em;
    border-radius: 0.4em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    cursor: default;
    user-select: none;
}

</style>