#!/usr/bin/env node
const fs = require('fs');
const brain = require('brain.js');
const { LSTM } = brain.recurrent;
const net = new brain.recurrent.LSTMTimeStep();
const config = {
  iterations: 30,
  log: true,
  logPeriod: 5,
  layers: [10]
 // callback: function(data){
 //   console.log(data);
//}
};
let dt = JSON.parse(fs.readFileSync('data_modules/pbNNtv3.json', 'utf8'));

const trainingSet = dt.map((e) => {
    const out = [
      Number(e.num1),
      Number(e.num2),
      Number(e.num3),
      Number(e.num4),
      Number(e.num5),
      Number(e.pb),
      Number(e.pp)
    ]
    const inp = [
      Number(new Date(e.date).getTime()), 
      Number(e.orbit_id), 
      Number(e.dist), 
      Number(e.dist_min), 
      Number(e.dist_max), 
      Number(e.v_rel), 
      Number(e.v_inf)
    ];
    const obj = brain.trainingSet = {
      input: inp,
      output: out
    };
    return obj;
});

const inquiry = [ 
  1712534400000, 
  5, 
  0.0264659893544376, 
  0.0263998508854494, 
  0.0265321271913223, 
  10.2895227911258, 
  10.2797338521281
]
//console.log(trainingSet);



const training = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const network = new LSTM();
//net.train(training);
//net.forecast(trainingSet3);
network.train(trainingSet, config);
//network.runs(inquiry)

const output = network.run(inquiry);
console.log(output);
console.log(`Result Length: ${output.length}`);
console.log(`Result: ${output}`);
