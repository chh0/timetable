<script setup>

import { ref } from 'vue'

const data = ref([
    {
        id: '2022-9-23-0-0-0',
        name:'test',
        color:'#cc0ccc',
        duration:[['2022-9-23-0-0-0', '2022-9-24-0-0-0']],
        note:'this is just a test'
    },
    {
        id: '2022-9-24-0-0-0',
        name:'test2',
        color:'#cc00cc',
        duration:[['2022-9-24-0-0-0', '2022-9-25-0-0-0']],
        note:'this is just a test2'
    }
]);

</script>

<template>

<div class="Tasks" :style="{width:this.$store.state.TasksWindowWidth + 'px'}">
    <div class="Tasks-Head" 
        :style="{'height':this.$store.state.TaskHeight + 'em',
        'padding-top': (this.$store.state.TaskHeight - 1) / 2 + 'em' }">
        <div> 任务列表 </div>
    </div>
    <div v-for="item of data" 
        class="Tasks-Item" 
        :style="{'height':this.$store.state.TaskHeight + 'em',
         }">
        <div
        :style="{'padding-top': (this.$store.state.TaskHeight - 1) / 2 + 'em'}"
        >{{ item.name }}</div>
    </div>
</div>

</template>

<style scoped>

.Tasks {
    position: fixed;
    top: 3em;
    left: 0px;
    background-color: #eeeeee;
    box-shadow: 0.1em 0 0.3em 0 #cccccc;
    height: 100%;
}

.Tasks-Item {
    width: 100%;
    text-align: center;
    background-color: #eeeeee;
    border-bottom: solid #aaaaaa 1px;
    transition: 0.3s;
}

.Tasks-Head {
    width: 100%;
    text-align: center;
    background-color: #dddddd;
    border-bottom: solid #dddddd 1px;
    transition: 0.3s;
}

.Tasks-Item:hover {
    background-color: #cccccc;
}


</style>
