var arrivalArr = [0,2,4,6,6,7,8,10,14,14]
var serviceTimeArr = [1,3,4,2,7,5,1,3,4,2]

//InterArrival Time Calculation Function
function interArrivalCalculation(arrivalArr){
    var interArrivalArr = [0]
    for (let i= 1 ; i < arrivalArr.length ; i++){
        let val = arrivalArr[i] - arrivalArr[i-1]
        interArrivalArr.push(val)
    }
return interArrivalArr
}

//TurnAround, Wait, Response Time Calculation Function
function timeCalculation(arr1,arr2){
    let resultantTimeArr = []
    for(let i = 0; i<arrivalArr.length; i++){
        resultantTimeArr.push(arr1[i]-arr2[i])
    }
    return resultantTimeArr
}


// //TurnAround Time Calculation Function
// function turnAroundTimeCalculation(endingTimeArr,arrivalArr){
//     let turnAroundTimeArr = []
//     for(let i = 0; i<arrivalArr.length; i++){
//         turnAroundTimeArr.push(endingTimeArr[i]-arrivalArr[i])
//     }
//     return turnAroundTimeArr
// }

// //Waiting Time Calculation Function
// function waitTimeCalculation(turnAroundTimeArr,serviceTimeArr){
//     let waitTimeArr = []
//     for(let i = 0; i<turnAroundTimeArr.length; i++){
//         waitTimeArr.push(turnAroundTimeArr[i]-serviceTimeArr[i])
//     }
//     return waitTimeArr
// }

// //Response Time Calculation Function
// function responseTimeCalculation(startTimeArr,arrivalArr){
//     let responseTimeArr = []
//     for(let i = 0; i<arrivalArr.length; i++){
//         responseTimeArr.push(startTimeArr[i]-arrivalArr[i])
//     }
//     return responseTimeArr
// }


//Start And End Time Calculation Function

function startEndArrCalculation(arrivalArr,serviceTimeArr){
    let startTime = []
    let endTime = []

    let startTimeIdle = []
    let endTimeIdle = []


    for(let i=0;i<arrivalArr.length;i++){
        if(i==0){
            startTime.push(arrivalArr[i])
            endTime.push(arrivalArr[i]+serviceTimeArr[i])
        }
        else{
            if(endTime[i-1]<arrivalArr[i]){
                startTimeIdle.push(endTime[i-1])
                endTimeIdle.push(arrivalArr[i])
                
                startTime.push(arrivalArr[i])                
                endTime.push(arrivalArr[i]+serviceTimeArr[i])
            }
            else{
                startTime.push(endTime[i-1])
                endTime.push(startTime[i]+serviceTimeArr[i])
            }
        }
    }
    return [startTime,endTime,startTimeIdle,endTimeIdle]
}


//================================================ M/M/1 (RAW DATA) =======================================

//Avg InterArrival,Waiting,Service,TurnAround Time Calculation
function  avgTime(arr){
    return arr.reduce((a, b) => a + b, 0) / arr.length
}


// //Avg InterArrival Time Calculation
// function avgInterArrivalTime(interArrivalArr){
//     return interArrivalArr.reduce((a, b) => a + b, 0) / interArrivalArr.length
// }

// //Avg Waiting Time Calculation
// function avgWaitingTime(waitTimeArr){
//     return waitTimeArr.reduce((a, b) => a + b, 0) / waitTimeArr.length
// }

// //Avg Service Time Calculation
// function avgServiceTime(serviceTimeArr){
//     return serviceTimeArr.reduce((a, b) => a + b, 0) / serviceTimeArr.length    
// }

// //Avg TurnAround Time Calculation
// function avgTurnAroundTime(turnAroundTimeArr){
//     return turnAroundTimeArr.reduce((a, b) => a + b, 0) / turnAroundTimeArr.length       
// }

//Average Waiting time for those who wait

function avgWaitingTimeWhoWait(waitTimeArr){
    return  waitTimeArr.reduce((a, b) => a + b, 0) / (waitTimeArr.length - (waitTimeArr.filter(x => x === 0).length))
}

//Utilization Rate Calculation
function avgUtilizationRate(startTimeIdle,endTimeIdle,endTimeLastVal){
    let idle = 0
    for(let i=0;i<startTimeIdle.length;i++){
        idle+= (endTimeIdle[i]-startTimeIdle[i])
    }
    return Math.round((1-(idle/endTimeLastVal))*100)
}


function main(){
var interArrivalArr = interArrivalCalculation(arrivalArr)
var startEnd = startEndArrCalculation(arrivalArr,serviceTimeArr)
var turnAroundTimeArr = timeCalculation(startEnd[1],arrivalArr)
var waitTimeArr = timeCalculation(turnAroundTimeArr,serviceTimeArr)
var responseTimeArr = timeCalculation(startEnd[0],arrivalArr)


var startTime = startEnd[0]
var endTime = startEnd[1]

var startTimeIdle = startEnd[2]
var endTimeIdle = startEnd[3]


var avgServiceT = avgTime(serviceTimeArr)
var avgTurnAroundT = avgTime(turnAroundTimeArr)
var avgWaitingT =  avgTime(waitTimeArr)
var avgInterArrivalT =  avgTime(interArrivalArr)

var waitTimeWhoWaitArr = avgWaitingTimeWhoWait(waitTimeArr)

console.log("Interarrival Time",interArrivalArr)
console.log("Waiting Time",waitTimeArr)
console.log("Wait Time for those who wait",waitTimeWhoWaitArr)
console.log("Response Time",responseTimeArr)
console.log("Turnaround Time",turnAroundTimeArr)

console.log("Start Time",startTime)
console.log("End Time",endTime)

console.log("Start Idle Time",startTimeIdle)
console.log("End Idle Time",endTimeIdle)

console.log("Average Service Time",avgServiceT)
console.log("Average TurnAround Time",avgTurnAroundT)
console.log("Average Waiting Time",avgWaitingT)
console.log("Average InterArrival Time",avgInterArrivalT)
console.log("Avg Utilization rate = ",avgUtilizationRate(startTimeIdle,endTimeIdle,endTime[endTime.length-1]),"%")
}

// main()

//================================ SIMMULATION ========================================

// function factorial(n){
//     //base case
//     if(n == 0 || n == 1){
//         return 1;
//     //recursive case
//     }else{
//         return n * factorial(n-1);
//     }
// }


// function cummulativeProb(x,lmbda, mu){
//     let e = 2.718281828
//     let result = 0
//     for(let i=0 ; i<=x ; i++){
//         result += (Math.pow(e,-lmbda)*Math.pow(lmbda,i))/ factorial(i)
//     }
//     return result.toFixed(4)
// }



function TimeSimmulation(mu){
    return (-mu * Math.log(Math.random(0,1))).toFixed(0)
}

function mainSimmulation(hrs){
    var result = 0
    let serviceTimeSim = []
    let InterArrivalTimeSim = [0]

    //for interArrival time
    for(let i=0;i>-1;i++){
        gen_val = TimeSimmulation(1.58)
        result = Number(result) + Number(gen_val)
        InterArrivalTimeSim.push(Number(gen_val))
        if(result == hrs){
            console.log(result)
            break
        }
    }

    //for service time
    for(let i=0;i<InterArrivalTimeSim.length;i++){
        gen_val = TimeSimmulation(1.58)
        serviceTimeSim.push(Number(gen_val))
    }
    return [InterArrivalTimeSim,serviceTimeSim]
}


function arrivalTimeSim(interarrivalArr){
    let arrivalArr = [0]
    for(let i=0;i<interarrivalArr.length;i++){
        if(i!=0){
            arrivalArr.push(arrivalArr[i-1]+interarrivalArr[i])
        }
    }
    return arrivalArr
}








