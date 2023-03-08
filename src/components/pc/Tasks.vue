<script setup>

</script>

<template>

<div class="Tasks" :style="{width:this.$store.state.TasksWindowWidth + 'px'}">
    <div class="Tasks-Head" 
        :style="{'height':this.$store.state.TaskHeight + 'em',
        'padding-top': (this.$store.state.TaskHeight - 1) / 2 + 'em' }">
        <div> 任务列表 </div>
    </div>
    <div v-for="item of this.$store.state.SortedData" 
        class="Tasks-Item" 
        :style="{'height':this.$store.state.TaskHeight + 'em',
                 'border-left': this.$store.state.StateColors[this.$store.state.KindsOptions.indexOf(item.state.kind)] + ' 8px solid'
         }">
        <div :style="{
            'padding-top': (this.$store.state.TaskHeight - 1) / 2 + 'em',
            }"
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
    width: calc(100% - 8px);
    text-align: center;
    background-color: #eeeeee;
    border-bottom: solid #aaaaaa 1px;
    transition: 0.3s;
}

.Tasks-Head {
    width: calc(100% - 8px);
    border-left: 8px solid #dddddd;
    text-align: center;
    background-color: #dddddd;
    border-bottom: solid #dddddd 1px;
    transition: 0.3s;
}

.Tasks-Item:hover {
    background-color: #cccccc;
}


</style>
