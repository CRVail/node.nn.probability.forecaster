#!/usr/bin/env node
const fs = require('fs');
const brain = require('brain.js');
const { LSTM } = brain.recurrent;
const arg = process.argv.slice(2);
arg[0] = arg[0];

// create configuration for training
const config = {
  iterations: 10,
  log: true,
  logPeriod: 5,
  layers: [10],
};

let dt = JSON.parse(fs.readFileSync('data_modules/pbNNt.json', 'utf8'));
const trainingSet = dt.map((e) => {
    const date = e.Date;
    const out = e.date + "," + e.num1 + "," + e.num2 + "," + e.num3 + "," + e.num4 + "," + e.num5 + "," + e.pb + "," + e.pp;
    const inp = e.date + "," + e.NNt;
    const obj = brain.traininSet = {
      input: inp,
      output: out
    };
    return obj;
});
const network = new LSTM();

const tst = "5/3/2024,\nPLANETARY=2022 AA5,12,2460434.080093748,2024-May-03 13:55,0.0345722935926489,0.0345710017346602,0.0345735854506297,9.03719817641772,9.02866608662834,< 00:01,Earth,23.63|\nNEO=2022 AA5,12,2460434.080093748,2024-May-03 13:55,0.0345722935926489,0.0345710017346602,0.0345735854506297,9.03719817641772,9.02866608662834,< 00:01,23.63,       (2022 AA5)";

network.train(trainingSet, config);
const toExport = network.toJSON();
const output = network.run(tst);

console.log(`Results ${output}`);

console.log("\n\nEXPRT:");
console.log(toExport);