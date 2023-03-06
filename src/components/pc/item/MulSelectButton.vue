<script>

//遇到一个坑，就是定义f这里如果用f(){}可以获取正确的this，但f=()=>{}就不行...
//访问props和data()的变量都要用this才行...

export default {
    data(){
        return {
            selectState:[],
            displayState:{}
        }
    },
    props: {
        selections: Array
    },
    methods: {
        handleClick(item){
            if(this.displayState[item] === "Mul-Select-Item"){
                this.addKinds(item)
                this.$store.commit('ChangeKinds', this.selectState)
                this.displayState[item] = "Mul-Select-Item-Clicked"
            }else{
                this.delKinds(item)
                this.$store.commit('ChangeKinds', this.selectState)
                this.displayState[item] = "Mul-Select-Item"
            }
        },
        addKinds (item) {this.selectState.push(item)},
        delKinds (item) {this.selectState = this.selectState.filter(i => i!==item)}
    },
    mounted(){
        for (let i of this.selections) this.displayState[i] = "Mul-Select-Item"
        this.displayState[this.selections[0]] = "Mul-Select-Item-Clicked"
        this.selectState.push(this.selections[0])
    }
}

</script>

<template>

<span class="Mul-Select-Button" @click="this.$store.commit('UpdateData')">
    <span v-for="item of selections" :class="displayState[item]" v-on:click="handleClick(item)">{{item}}</span>
</span>

</template>
    
<style scoped>


.Mul-Select-Button {
    margin-right: 0.5em;
    font-size: 1.5em;
    background-color: #eeeeee;
    padding: 0.2em;
    border-radius: 0.4em;
}

.Mul-Select-Item {
    display: inline-block;
    width: 2.5em;
    text-align: center;
    user-select: none;
    border-radius: 0.5em;
    margin-left: 0.1em;
    margin-right: 0.1em;
}

.Mul-Select-Item:hover {
    background-color: #cccccc;
}

.Mul-Select-Item-Clicked {
    display: inline-block;
    width: 2.5em;
    text-align: center;
    user-select: none;
    border-radius: 0.5em;
    margin-left: 0.1em;
    margin-right: 0.1em;
    background-color: #007700;
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

/* .Mul-Select-Item {
    background-color: #eeeeee;
} */
</style>

