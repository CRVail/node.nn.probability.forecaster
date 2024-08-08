#!/usr/bin/env node
const brain = require('brain.js');
const fs = require('fs');
const { LSTM } = brain.recurrent;


let dt = JSON.parse(fs.readFileSync('data_modules/pbNNtv2.json', 'utf8'));
const trainingSet = dt.map((e) => {
    const out = {
      date: e.date,
      num1: String(e.num1),
      num2: String(e.num2),
      num3: String(e.num3),
      num4: String(e.num4),
      num5: String(e.num5),
      pb: String(e.pb),
      pp: String(e.pp)
    };
    const outString = e.num1 + "," + e.num2 + "," + e.num3 + "," + e.num4 + "," + e.num5 + "," + e.pb + "," + e.pp;
    console.log(outString);
    const inp = {
      date: e.date,
      planetary: e.planetary,
      neo: e.neo
    };
    const obj = brain.trainingSet = {
      input: inp,
      output: outString
    };
    return obj;
});

const config = {
  binaryThresh: 0.5,
  hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
  activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
};

const NN = new brain.NeuralNetwork(config);
var plan = "2022 AA5,12,2460434.080093748,2024-May-03 13:55,0.0345722935926489,0.0345710017346602,0.0345735854506297,9.03719817641772,9.02866608662834,< 00:01,Earth,23.63";
var neo = "2022 AA5,12,2460434.080093748,2024-May-03 13:55,0.0345722935926489,0.0345710017346602,0.0345735854506297,9.03719817641772,9.02866608662834,< 00:01,23.63,       (2022 AA5)";
NN.train(trainingSet);
const output = NN.run({ date: "5/4/2024", planetary: plan, neo: neo });

//console.log(ot);
console.log(output);