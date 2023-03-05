<script>

//遇到一个坑，就是定义f这里如果用f(){}可以获取正确的this，但f=()=>{}就不行...
//访问props和data()的变量都要用this才行...

export default {
    data(){
        return {
            displayState:{}
        }
    },
    props: {
        selections: Array
    },
    methods: {
        handleClick(item){
            this.$store.commit('ChangeViewLength', item)
            for (let i of this.selections) this.displayState[i] = "Select-Item"
            this.displayState[item] = "Select-Item-Clicked"
        },
    },
    mounted(){
        for (let i of this.selections) this.displayState[i] = "Select-Item"
        this.displayState[this.$store.state.ViewLength] = "Select-Item-Clicked"
    }
}

</script>

<template>

<span class="Select-Button">
    <span v-for="item of selections" 
    :class="displayState[item]"
    @click="handleClick(item)"> {{ item }} </span>
</span>

</template>
    
<style scoped>


.Select-Button {
    margin-right: 0.5em;
    font-size: 1.5em;
    background-color: #eeeeee;
    padding: 0.2em;
    border-radius: 0.4em;
}

.Select-Item {
    display: inline-block;
    width: 2em;
    text-align: center;
    user-select: none;
    border-radius: 0.5em;
}

.Select-Item:hover {
    background-color: #cccccc;
}

.Select-Item-Clicked {
    display: inline-block;
    width: 2em;
    text-align: center;
    user-select: none;
    border-radius: 0.5em;
    background-color: #7777ff;
    color: #ffffff;
}

/* .Select-Button-Box {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 1.5em;
}

.Select-Button-Box-Box {
    background-color: #eeeeee;
} */

/* .Select-Item {
    background-color: #eeeeee;
} */
</style>

