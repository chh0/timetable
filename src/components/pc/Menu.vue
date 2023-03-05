<script setup>

import SelectButton from './item/SelectButton.vue';
import MulSelectButton from './item/MulSelectButton.vue';


</script>

<template>

<div class="Menu">
    <div class="Menu-Left">
        <span class="Menu-Today">今日:{{(new Date()).getFullYear()}}-{{(new Date()).getMonth()+1}}-{{(new Date()).getDate()}}</span>
        <span class="Menu-Today">
            <span>《</span><span>&lt;</span>{{(this.$store.state.StartDate).getFullYear()}}-{{(this.$store.state.StartDate).getMonth()+1}}-{{(this.$store.state.StartDate).getDate()}}<span>&gt;</span><span>》</span>
        </span>
        <SelectButton :selections="['半年','月', '半月','周','日']" />
        <MulSelectButton :selections="['进行','结束','废弃']" />
    </div>
    <div class="Menu-Right">
        <span class="Menu-Span">
            <img src="../../assets/svg/新建.svg" class="Menu-Icon Menu-Icon-New" draggable="false" />
        </span>
        <span class="Menu-Span">
            <img src="../../assets/svg/编辑.svg" class="Menu-Icon Menu-Icon-Edit" draggable="false" />
        </span>
        <span class="Menu-Span">
            <img src="../../assets/svg/完成.svg" class="Menu-Icon Menu-Icon-Finished" draggable="false" />
        </span>
        <span class="Menu-Span">
            <img src="../../assets/svg/删除.svg" class="Menu-Icon Menu-Icon-Delete" draggable="false" />
        </span>
        <span class="Menu-Span">
            <img src="../../assets/svg/向上.svg" class="Menu-Icon Menu-Icon-Up" draggable="false" />
            </span>
        <span class="Menu-Span">
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

</style>