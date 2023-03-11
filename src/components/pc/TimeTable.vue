<script setup>

// const GetThisWeek = (date) => { 
//     return [
//         new Date(new Date().setDate(date.getDate() - date.getDay())),
//         new Date(new Date().setDate(date.getDate() - date.getDay() + 1)),
//         new Date(new Date().setDate(date.getDate() - date.getDay() + 2)),
//         new Date(new Date().setDate(date.getDate() - date.getDay() + 3)),
//         new Date(new Date().setDate(date.getDate() - date.getDay() + 4)),
//         new Date(new Date().setDate(date.getDate() - date.getDay() + 5)),
//         new Date(new Date().setDate(date.getDate() - date.getDay() + 6))
//     ]
//  }

const GetThisWeek = (date) => { 
    let res = []
    for ( let i = 0 ; i < 7 ; i++ ) {
        res.push(new Date( date.getFullYear(), date.getMonth(), date.getDate() + i))
    }
    // for ( let i = 0 ; i < 7 ; i++ ) { res.push(new Date(new Date().setDate(date.getDate() + i))) }
    return res
}

const GetHalfMonth = (date) => { 
    let res = []
    for ( let i = 0 ; i < 15 ; i++ ) {
        res.push(new Date( date.getFullYear(), date.getMonth(), date.getDate() + i))
    }
    // for ( let i = 0 ; i < 15 ; i++ ) { res.push(new Date(new Date().setDate(date.getDate() + i))) }
    return res
 }

const GetMonth = (date) => { 
    let res = []
    for ( let i = 0 ; i < 30 ; i++ ) {
        res.push(new Date( date.getFullYear(), date.getMonth(), date.getDate() + i))
    }
    // for ( let i = 0 ; i < 30 ; i++ ) { res.push(new Date(new Date().setDate(date.getDate() + i))) }
    return res
 }

// const GetMonthDays = (date) => {
// 	let curDate = new Date(date)
// 	let curMonth = curDate.getMonth();
// 	curDate.setMonth(curMonth+1);
// 	curDate.setDate(0);
// 	return curDate.getDate();
// }


function GetMonthDays(date){
	let curDate = new Date(date)
	curDate.setDate(32);
	return 32-curDate.getDate();
}


// const GetMonth = (date) => {
//     let res = []
//     for ( let i = 1 ; i <= GetMonthDays(date) ; i++ ) { res.push(new Date(new Date().setDate(i))) }
//     return res
// }

const GetHalfYear = (date) => { 
    let res = []
    for ( let i = 0 ; i < 180 ; i++ ) {
        res.push(new Date( date.getFullYear(), date.getMonth(), date.getDate() + i))
    }
    // for ( let i = 0 ; i < 180 ; i++ ) { res.push(new Date(new Date().setDate(date.getDate() + i))) }
    return res
 }

const GetHalfYearMonthList = (date) => {
    let days = GetHalfYear(date)
    let res = []
    let j = 0
    for (let i = 0 ; i < 180 ; i++ ) {
        j++
        let x = days[i]
        // console.log(x.getDate(), GetMonthDays(x))
        if (x.getDate() == GetMonthDays(x) || i == 179) {
            res.push([x.getMonth()+1, j, x.getFullYear()])
            j = 0
        }
    }
    return res
}

const TimeStrToDate = (str) => {
    // 2022-9-23-0-0-0
    let arr = str.split('-')
    // alert(year,month,day,hour,minute,second)
    return new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4], arr[5],0)
}

const CalcRailItemPosAndColor = ( type, start_date, event_obj ) => {
    let res = []
    let duration = event_obj.duration
    let one_day = 86400000
    let total = one_day
    // time calculated in mill sec
    // return [[start persent%, length persent%], [start persent%, length persent%], ... ]
    if (type === "半年") {
        total *= 180
    } else if (type === "月") {
        total *=30
    } else if (type === "半月") {
        total *= 15
    } else if (type === "周") {
        total *= 7
    } else if (type === "日") {
        total *= 1
    } else {
        alert(" something error ! ")
        return 0
    }
    
    for ( let i of duration ) {
        let StartPoint = TimeStrToDate(i[0])
        let EndPoint = TimeStrToDate(i[1])
        let left = StartPoint - start_date
        let length = EndPoint - StartPoint
        let right = EndPoint - start_date
        left = left / total * 100
        length = length / total * 100
        right = right / total * 100
        if (right < left) alert(" error in data ![1] ")

        // console.log([
        //     [StartPoint.getMonth(), StartPoint.getDate(), StartPoint.getHours()], 
        //     [EndPoint.getMonth(), EndPoint.getDate(), EndPoint.getHours()],
        //     [start_date.getMonth(), start_date.getDate(), start_date.getHours()]])

        if ( left <= 0 && right <= 0 ) {}
        else if ( left <= 0 && right > 0 && right <= 100 ) { res.push([0, right, event_obj.state.color]) }
        else if ( left <= 0 && right > 100 ) { res.push([0, 100, event_obj.state.color]) }
        else if ( left > 0 && right <= 100 ) { res.push([left, length, event_obj.state.color]) }
        else if ( left > 0 && left <= 100 && right > 100 ) { res.push([left, 100-left, event_obj.state.color]) }
        else if ( left > 100 ) {}
        else { alert(" error in data ![2] ") }
    } 

    return res
}


const IsWeekend = (date) => {
    if ( date.getDay() === 0 || date.getDay() === 6 ) return 1
    return 0
}

const setDayItemColor = (date) => {
    if ( IsWeekend(date) === 1 ) return '#d0d0d0'
    return '#dddddd'
}

const setHourItemColor = (hour) => {
    if ( hour < 8 || hour > 18) return '#d0d0d0'
    return '#dddddd'
}

const setMonthItemColor = (arr) => {
    if (arr[0] % 2) return '#d0d0d0'
    return '#dddddd'
}

</script>

<template>

<div class="TimeTable" :style="{
    'left': this.$store.state.TasksWindowWidth + 'px',
    'width': 'calc(100% - ' + this.$store.state.TasksWindowWidth + 'px)'
}">
    <div class="TimeTable-Head"
         :style="{'padding-top': (this.$store.state.TaskHeight - 1) / 2 + 'em'}">
        <div class="TimeTable-Head-Content" v-if="this.$store.state.ViewLength === '日'">
            <div v-for="i in [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]"
                  class="TimeTable-HeadItem TimeTable-Head-DateItem"
                  :style="{'background-color':setHourItemColor(i)}">
                {{ i }}
                </div>
        </div>
        <div class="TimeTable-Head-Content" v-else-if="this.$store.state.ViewLength === '周'">
            <div v-for="i in GetThisWeek(this.$store.state.StartDate)"
                  class="TimeTable-HeadItem TimeTable-Head-WeekItem"
                  :style="{'background-color':setDayItemColor(i)}">
                  {{ i.getMonth()+1 }}-{{ i.getDate() }}
                </div>
        </div>
        <div class="TimeTable-Head-Content" v-else-if="this.$store.state.ViewLength === '半月'">
            <!-- {{ GetHalfMonth(this.$store.state.StartDate) }} -->
            <div v-for="i in GetHalfMonth(this.$store.state.StartDate)"
                  class="TimeTable-HeadItem TimeTable-Head-HelfMonthItem"
                  :style="{'background-color':setDayItemColor(i)}">
                  {{ i.getMonth()+1 }}-{{ i.getDate() }}
                </div>
        </div>
        <div class="TimeTable-Head-Content" v-else-if="this.$store.state.ViewLength === '月'">
            <!-- {{ GetMonthDays(this.$store.state.StartDate) }} -->
            <!-- :style="{'width':'calc(100% / ' + (GetMonthDays(this.$store.state.StartDate)) + ' - 1px)'}" -->
            <div v-for="i in GetMonth(this.$store.state.StartDate)"
                  class="TimeTable-HeadItem TimeTable-Head-MonthItem"
                  :style="{'background-color':setDayItemColor(i)}">
                  {{ i.getDate() }}
                </div>
        </div>
        <div class="TimeTable-Head-Content" v-else-if="this.$store.state.ViewLength === '半年'">
            <!-- {{ GetHalfYearMonthList(this.$store.state.StartDate) }} -->
            <div v-for="i in GetHalfYearMonthList(this.$store.state.StartDate)"
                  class="TimeTable-HeadItem TimeTable-Head-HalfYearItem"
                  :style="{
                    'width':'calc(100% *' + i[1]/180 + ' - 1px )',
                    'background-color':setMonthItemColor(i)
                    }">
                  {{ i[2] }}-{{ i[0] }}
                </div>
        </div>
    </div>


    <div class="TimeTable-Rails"
         :style="{
            'top':'calc(' + (this.$store.state.TaskHeight*1.5-0.5) + 'em + 1px)',
            }">
        <div v-for="item in this.$store.state.SortedData"
             class="TimeTable-Rails-Rail"
             :style="{
                'height': this.$store.state.TaskHeight + 'em',
             }">
            <!-- {{ CalcRailItemPos(this.$store.state.ViewLength, this.$store.state.StartDate, item) }} -->
            <!-- {{ item.duration }} -->
            <!-- {{ this.$store.state.StartDate.getMonth() }} -->
            <div class="TimeTable-Rails-Rail-Item" 
                 v-for="item2 in CalcRailItemPosAndColor(this.$store.state.ViewLength, this.$store.state.StartDate, item)"
                 :style="{
                    'left':item2[0]+'%',
                    'width':item2[1]+'%',
                    'height':this.$store.state.TaskHeight+'em',
                    'background-color':item2[2]
                 }">
            </div>
            <div class="TimeTable-Rails-Rail-Note" 
                v-if="this.$store.state.NoteDisplay"
                :style="{
                    'height':this.$store.state.TaskHeight+'em',
                    'color':'#3f3f3f',
                    'padding-left': '1em',
                    'padding-top': 'calc(' + ((this.$store.state.TaskHeight-1)*0.5) + 'em - 1px)'
                 }"> {{ item.note }}
            </div>
        </div>
    </div>
</div>

</template>

<style scoped>

.TimeTable {
    position: fixed;
    top: 3em;
    height: 100%;
    /* text-overflow: ellipsis; */
    /* overflow: hidden; */
    white-space:nowrap
}

.TimeTable-Head {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #dddddd;
}

.TimeTable-Rails {
    width: 100%;
    height: 100%;
    position: absolute;
}

.TimeTable-Head-Content {
    height: 100%;
}

.TimeTable-HeadItem {
    display: inline-block;
    height: 100%;
    border-right: solid 1px #bbbbbb;
    text-align: center;
    
}

.TimeTable-Head-DateItem {
    width: calc(100% / 24 - 1px);
}

.TimeTable-Head-WeekItem {
    width: calc(100% / 7 - 1px);
}

.TimeTable-Head-HelfMonthItem {
    width: calc(100% / 15 - 1px);
}

.TimeTable-Head-MonthItem {
    width: calc(100% / 30 - 1px);
}

/* .TimeTable-Head-HalfYearItem {
} */

.TimeTable-Rails-Rail {
    border-bottom: solid 1px #bbbbbb;
}

.TimeTable-Rails-Rail-Item {
    display: inline-block;
    position: absolute;
}

.TimeTable-Rails-Rail-Note {
    display: inline-block;
    position: absolute;
}

</style>
