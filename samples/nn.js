#!/usr/bin/env node
const brain = require('brain.js');
const fs = require('fs');

const config = {
  binaryThresh: 0.5,
  hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
  activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
};

const NN = new brain.NeuralNetwork(config);
const NNa = new brain.NeuralNetwork();
const arg = process.argv.slice(2);
 
let dt = JSON.parse(fs.readFileSync('data_modules/pbNNtv3.json', 'utf8'));
const trainingSet = dt.map((e) => {
    const out = {
      num1: Number(e.num1),
      num2: Number(e.num2),
      num3: Number(e.num3),
      num4: Number(e.num4),
      num5: Number(e.num5),
      pb: Number(e.pb),
      pp: Number(e.pp)
    }
    const inp = {
      inquiry_alignment: new Date(e.date).getTime(), 
      orbit_id: Number(e.orbit_id), 
      dist: Number(e.dist), 
      dist_min: Number(e.dist_min), 
      dist_max: Number(e.dist_max), 
      v_rel: Number(e.v_rel), 
      v_inf: Number(e.v_inf), 
      h: Number(e.h)
    };
    const obj = brain.trainingSet = {
      input: inp,
      output: out
    };
    return obj;
});

NN.train(trainingSet);

const output = NN.run({ 
                        inquiry_alignment: 1712534400000, 
                        orbit_id: 5, 
                        dist: 0.0264659893544376, 
                        dist_min: 0.0263998508854494, 
                        dist_max: 0.0265321271913223, 
                        v_rel: 10.2895227911258, 
                        v_inf: 10.2797338521281, 
                        h: 25.34 
                      });
console.log(output);