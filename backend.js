// var arrivalArr = [0, 2, 4, 6, 6, 7, 8, 10, 14, 14];
// var serviceTimeArr = [1, 3, 4, 2, 7, 5, 1, 3, 4, 2];

//InterArrival Time Calculation Function
function interArrivalCalculation(arrivalArr) {
  var interArrivalArr = [0];
  for (let i = 1; i < arrivalArr.length; i++) {
    let val = arrivalArr[i] - arrivalArr[i - 1];
    interArrivalArr.push(val);
  }
  return interArrivalArr;
}

//TurnAround, Wait, Response Time Calculation Function
function timeCalculation(arr1, arr2) {
  let resultantTimeArr = [];
  for (let i = 0; i < arr1.length; i++) {

  // let val = arr1[i] - arr2[i]
  // let add_val =0 
  // let len = 0
  // for (let i=0;i<arr.length;i++){
  //   if((arr1[i] - arr2[i])>mins){
  //     break
  //   }
  //   else{
  //     val += arr[i]
  //     len = i
  //   }
  // }
  // return add_val/len 

    resultantTimeArr.push(Math.abs(arr1[i] - arr2[i]));
  }
  return resultantTimeArr;
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

function startEndArrCalculation(arrivalArr, serviceTimeArr) {
  let startTime = [];
  let endTime = [];

  let startTimeIdle = [];
  let endTimeIdle = [];

  for (let i = 0; i < arrivalArr.length; i++) {
    if (i == 0) {
      startTime.push(arrivalArr[i]);
      endTime.push(arrivalArr[i] + serviceTimeArr[i]);
    } else {
      if (endTime[i - 1] < arrivalArr[i]) {
        startTimeIdle.push(endTime[i - 1]);
        endTimeIdle.push(arrivalArr[i]);

        startTime.push(arrivalArr[i]);
        endTime.push(arrivalArr[i] + serviceTimeArr[i]);
      } else {
        startTime.push(endTime[i - 1]);
        endTime.push(startTime[i] + serviceTimeArr[i]);
      }
    }
  }
  return [startTime, endTime, startTimeIdle, endTimeIdle];
}

//================================================ M/M/1 (RAW DATA) =======================================

//Avg InterArrival,Waiting,Service,TurnAround Time Calculation
function avgTime(arr) {
  // let add_val = 0 
  // let len = 0
  // for (let i=0;i<arr.length;i++){
  //   if(arr[i]>mins){
  //     break
  //   }
  //   else{
  //     add_val += arr[i]
  //     len = i
  //   }
  // }
  // return add_val/len
  return arr.reduce((a, b) => a + b, 0) / arr.length;
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

function avgWaitingTimeWhoWait(waitTimeArr) {
  return (
    waitTimeArr.reduce((a, b) => a + b, 0) /
    (waitTimeArr.length - waitTimeArr.filter((x) => x === 0).length)
  );
}

//Utilization Rate Calculation
function avgUtilizationRate(startTimeIdle, endTimeIdle, endTimeLastVal) {
  let idle = 0;
  for (let i = 0; i < startTimeIdle.length; i++) {
    idle += endTimeIdle[i] - startTimeIdle[i];
  }
  return Math.round((1 - idle / endTimeLastVal) * 100);
}

function main() {
  var interArrivalArr = interArrivalCalculation(arrivalArr);
  var startEnd = startEndArrCalculation(arrivalArr, serviceTimeArr);
  var turnAroundTimeArr = timeCalculation(startEnd[1], arrivalArr);
  var waitTimeArr = timeCalculation(turnAroundTimeArr, serviceTimeArr);
  var responseTimeArr = timeCalculation(startEnd[0], arrivalArr);

  var startTime = startEnd[0];
  var endTime = startEnd[1];

  var startTimeIdle = startEnd[2];
  var endTimeIdle = startEnd[3];

  var avgServiceT = avgTime(serviceTimeArr);
  var avgTurnAroundT = avgTime(turnAroundTimeArr);
  var avgWaitingT = avgTime(waitTimeArr);
  var avgInterArrivalT = avgTime(interArrivalArr);

  var waitTimeWhoWaitArr = avgWaitingTimeWhoWait(waitTimeArr);

  console.log("Interarrival Time", interArrivalArr);
  console.log("Waiting Time", waitTimeArr);
  console.log("Wait Time for those who wait", waitTimeWhoWaitArr);
  console.log("Response Time", responseTimeArr);
  console.log("Turnaround Time", turnAroundTimeArr);

  console.log("Start Time", startTime);
  console.log("End Time", endTime);

  console.log("Start Idle Time", startTimeIdle);
  console.log("End Idle Time", endTimeIdle);

  console.log("Average Service Time", avgServiceT);
  console.log("Average TurnAround Time", avgTurnAroundT);
  console.log("Average Waiting Time", avgWaitingT);
  console.log("Average InterArrival Time", avgInterArrivalT);
  console.log(
    "Avg Utilization rate = ",
    avgUtilizationRate(startTimeIdle, endTimeIdle, endTime[endTime.length - 1]),
    "%"
  );
}

// main()

//================================ SIMMULATION ========================================

function TimeSimulation(mu) {
  return (-mu * Math.log(1 - Math.random()));
}

function Simulation(mins, lambda, mu) {
  var result = 0;
  let serviceTimeSim = [];
  let InterArrivalTimeSim = [0];
  let gen_val = 0;

  //for interArrival time
  for (let i = 0; i > -1; i++) {
    gen_val = TimeSimulation(lambda);
    result = Number(result) + Number(gen_val);
    if (result >= mins) {
      console.log(result);
      break;
    }
    else{
      InterArrivalTimeSim.push(Number(gen_val));
    }
  }

  //for service time
  for (let i = 0; i < InterArrivalTimeSim.length; i++) {
    gen_val = TimeSimulation(mu);
    serviceTimeSim.push(Number(gen_val));
  }
  return [InterArrivalTimeSim, serviceTimeSim];
}

function arrivalTimeSim(interarrivalArr) {
  let arrivalArr = [0];
  for (let i = 0; i < interarrivalArr.length; i++) {
    if (i != 0) {
      arrivalArr.push(arrivalArr[i - 1] + interarrivalArr[i]);
    }
  }
  return arrivalArr;
}

// function TimeSimulation(mu_lambda) {
//   return Math.round(-Math.log(1 - Math.random()) * mu_lambda);
// }

// function Simulation(mins, lambda, mu) {
  
//   let clock = 0;
//   let serviceTimeArray = [];
//   let interArrivalTimeArray = [];
//   let arrivalTimeArray = [];
//   let clockArray = []

// while (clock <= mins){
//     clockArray.push(clock)
//     let arrival_t = 0;
//     let interarrival_t = TimeSimulation(lambda);
    
//     arrivalTimeArray.length > 0 ? arrival_t = arrivalTimeArray[arrivalTimeArray.length - 1] + interarrival_t :arrival_t = clock + interarrival_t;
//     let service_t = TimeSimulation(mu);
    
//     interArrivalTimeArray.push(interarrival_t)
//     arrivalTimeArray.push(arrival_t);
//     serviceTimeArray.push(service_t);
    
//     clock += Math.min(interarrival_t, service_t)
// }
//   return [interArrivalTimeArray, serviceTimeArray, arrivalTimeArray, clockArray];
// }

//-----------------------------------RATE PARAMETER MODELS-----------------------------------
//-------------------------------some used functions----------------------------------
function variance(max, min) {
  return Math.pow((max - min),2) / 12;
}
function cSquare(variance, mean) {
  return variance / Math.pow(mean, 2);
}
function factorial(num) {
  if (num == 0 || num == 1) {
    return 1;
  }
  var f = num;
  while (num > 1) {
    num--;
    f *= num;
  }
  return f;
}
//-------------------------------------M/M/1--------------------------------------------
function MM1(lambda, mu) {
  var rate_parameter = {};
  rate_parameter["utilization"] = lambda / mu;
  rate_parameter["number_of_customer_in_queue"] =
    Math.pow(rate_parameter["utilization"], 2) /
    (1 - rate_parameter["utilization"]);
  rate_parameter["wait_in_queue"] =
    rate_parameter["number_of_customer_in_queue"] / lambda;
  rate_parameter["wait_in_system"] = rate_parameter["wait_in_queue"] + 1 / mu;
  rate_parameter["number_of_customer_in_system"] =
    lambda * rate_parameter["wait_in_system"];
  rate_parameter["proportion_of_idletime"] = 1 - rate_parameter["utilization"];
  return rate_parameter;
}
// console.log(MM1(0.1, 0.125));

//-------------------------------------M/G/1--------------------------------------------
function MG1(lambda, mu, variance) {
  var rate_parameter = {};
  rate_parameter["utilization"] = lambda / mu;
  rate_parameter["number_of_customer_in_queue"] =
    (Math.pow(lambda, 2) * Math.pow(variance, 2) +
      Math.pow(rate_parameter["utilization"], 2)) /
    (2 * (1 - rate_parameter["utilization"]));
  rate_parameter["wait_in_queue"] =
    rate_parameter["number_of_customer_in_queue"] / lambda;
  rate_parameter["wait_in_system"] = rate_parameter["wait_in_queue"] + 1 / mu;
  rate_parameter["number_of_customer_in_system"] =
    lambda * rate_parameter["wait_in_system"];
  rate_parameter["proportion_of_idletime"] = 1 - rate_parameter["utilization"];
  return rate_parameter;
}

// console.log(MG1(0.1, 0.125, variance(9, 7)));

//-------------------------------------G/G/1--------------------------------------------
function GG1(lambda, mu, varianceA, varianceS) {
  var rate_parameter = {};
  rate_parameter["utilization"] = lambda / mu;
  let utilizationSquare = Math.pow(rate_parameter["utilization"], 2);
  let CaSquare = cSquare(varianceA, 1 / lambda);
  let CsSquare = cSquare(varianceS, 1 / mu);
  rate_parameter["number_of_customer_in_queue"] =
    (utilizationSquare *
      (1 + CsSquare) *
      (CaSquare + utilizationSquare * CsSquare)) /
    (2 *
      (1 - rate_parameter["utilization"]) *
      (1 + utilizationSquare * CsSquare));
  rate_parameter["wait_in_queue"] =
    rate_parameter["number_of_customer_in_queue"] / lambda;
  rate_parameter["wait_in_system"] = rate_parameter["wait_in_queue"] + 1 / mu;
  rate_parameter["number_of_customer_in_system"] =
    lambda * rate_parameter["wait_in_system"];
  rate_parameter["proportion_of_idletime"] = 1 - rate_parameter["utilization"];
  return rate_parameter;
}

// console.log(GG1(0.1, 0.125, 20, 25));
//-------------------------------------M/M/C--------------------------------------------
function MMC(lambda, mu, varianceA, varianceS, C) {
  var rate_parameter = {};
  rate_parameter["utilization"] = lambda / (mu * C);
  var factor = 0;
  for (let i = 0; i < C; i++) {
    factor += Math.pow(C * rate_parameter["utilization"], i) / factorial(i);
  }
  factor +=
    Math.pow(C * rate_parameter["utilization"], C) /
    (factorial(C) * (1 - rate_parameter["utilization"]));
  var Po = 1 / factor;
  rate_parameter["number_of_customer_in_queue"] =
    (Po * Math.pow(lambda / mu, C) * rate_parameter["utilization"]) /
    (factorial(C) * Math.pow(1 - rate_parameter["utilization"], 2));
  rate_parameter["wait_in_queue"] =
    rate_parameter["number_of_customer_in_queue"] / lambda;
  rate_parameter["wait_in_system"] = rate_parameter["wait_in_queue"] + 1 / mu;
  rate_parameter["number_of_customer_in_system"] =
    lambda * rate_parameter["wait_in_system"];
  rate_parameter["proportion_of_idletime"] = 1 - rate_parameter["utilization"];
  return rate_parameter;
}

// console.log(MMC(0.1, 0.0667, 100, 8.333, 2));

//-------------------------------------G/G/C--------------------------------------------
function GGC(lambda, mu, varianceA, varianceS, C) {
  var rate_parameter = {};
  rate_parameter["utilization"] = lambda / (mu * C);
  let CaSquare = cSquare(varianceA, 1 / lambda);
  let CsSquare = cSquare(varianceS, 1 / mu);
  let mmcWq = MMC(lambda, mu, varianceA, varianceS, C);
  rate_parameter["wait_in_queue"] =
    mmcWq.wait_in_queue * ((CaSquare + CsSquare) / 2);
  rate_parameter["number_of_customer_in_queue"] =
    rate_parameter["wait_in_queue"] * lambda;
  rate_parameter["wait_in_system"] = rate_parameter["wait_in_queue"] + 1 / mu;
  rate_parameter["number_of_customer_in_system"] =
    lambda * rate_parameter["wait_in_system"];
  rate_parameter["proportion_of_idletime"] = 1 - rate_parameter["utilization"];
  return rate_parameter;
}

// console.log(GGC(0.1, 0.0667, 100, 8.333, 2));

//========================================== M/M/C Simmulation =====================================================


function strtEnd_M_M_C(arrivalArr,serviceTimeArr,c){
  //start and end data array
  let data = []
  //servers array
  var s = Array(c).fill(0);
  // console.log(s)

  let start=[]
  let end=[]
  let server=[]

  for(let i=0;i<serviceTimeArr.length;i++){
      if(i==0){
          data.push([i,arrivalArr[i],arrivalArr[i]+serviceTimeArr[i]])
          start.push(arrivalArr[i])
          end.push(arrivalArr[i]+serviceTimeArr[i])
          s[i]=1
          server.push(i)
      }
      else{
          if(s.indexOf(0)!==-1){
              let ind = s.indexOf(0)
              data.push([ind,arrivalArr[i],arrivalArr[i]+serviceTimeArr[i]])

              start.push(arrivalArr[i])
              end.push(arrivalArr[i]+serviceTimeArr[i])
              server.push(ind)

              s[ind]=1
          }
          else{
              //find last indexes of all servers
              let last_ind = []
              server.reverse()
              let arr_len = server.length-1
              let val =0
              for(let j = 0;j<s.length;j++){
                  val =j
                  if(server.indexOf(val)==0){
                      last_ind.push(server.indexOf(val)+(server.length-1))
                  }
                  else if(server.indexOf(val)==(server.length-1)){
                      last_ind.push(0)
                  }
                  else{
                      last_ind.push(arr_len-server.indexOf(val))
                  // last_ind.push(server.indexOf(val))
                  }
              }
              server.reverse()

              //find end values of servers and minimum among them
              let end_min_arr = []
              let min_end = 0
              for(let m = 0;m<last_ind.length;m++){
                  end_min_arr.push(end[last_ind[m]])
              }
              //minimum end value
              min_end = Math.min(...end_min_arr)

              if(end_min_arr.every(e => arrivalArr[i] < e)){
                  server.push(server[end_min_arr.indexOf(min_end)])
                  start.push(min_end)
                  end.push(min_end+serviceTimeArr[i])

                 data.push([
                      server[end_min_arr.indexOf(min_end)],
                      min_end,
                      min_end+serviceTimeArr[i]
                  ])
              }
              else{
                  if(arrivalArr[i]>min_end){
                      server.push(server[end_min_arr.indexOf(min_end)])
                      start.push(arrivalArr[i])
                      end.push(arrivalArr[i]+serviceTimeArr[i])

                      data.push([
                          server[end_min_arr.indexOf(min_end)],
                          arrivalArr[i],
                          arrivalArr[i]+serviceTimeArr[i]
                      ])
                  }
              }


          }
      }
  }
  return [server, start, end]
}

function utilizationRateMMC(server, serviceArray, C) {
  console.log("in function")
  let utilizationArray = [];
  let val = 0;
  let totalServiceTime = serviceArray.reduce((a, b) => a + b, 0)
  for(let i = 0; i < C; i++){
    console.log("in for loop")
    val = 0;
    for(let j=0; j<serviceArray.length; j++){
      if(server[j] === i){
        val += serviceArray[j]
      }
    }
    console.log("Value in fun: ", val)
    val = val/totalServiceTime;
    utilizationArray.push((val * 100).toFixed(2));
  }
  return utilizationArray
}

function proportion_of_idletime_MMC(utilizationArray){
  let idleTime = [];
  for(let i=0; i<utilizationArray.length; i++){
    idleTime.push(1-utilizationArray[i])
  }
  return idleTime
}


export {
    interArrivalCalculation,
    timeCalculation,
    startEndArrCalculation,
    avgTime,
    avgWaitingTimeWhoWait,
    avgUtilizationRate,
    // mainSimmulation,
    // arrivalTimeSim,
    MM1,
    MG1,
    GG1,
    MMC,
    GGC,
    TimeSimulation,
    Simulation,
    arrivalTimeSim,
    strtEnd_M_M_C,
    utilizationRateMMC,
    proportion_of_idletime_MMC
}
