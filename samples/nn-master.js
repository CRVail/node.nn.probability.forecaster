#!/usr/bin/env node
const brain = require('brain.js');

const config = {
  binaryThresh: 0.5,
  hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
  activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
  leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
};

const NN = new brain.NeuralNetwork(config);
const NNa = new brain.NeuralNetwork();
const arg = process.argv.slice(2);
 
arg[0] = arg[0];
arg[1] = Number(arg[1]);
arg[2] = Number(arg[2]);

NN.train([
  { input: { cpu: 100, ram: 80}, output: { risk: 10 } },
  { input: { cpu: 50 , ram: 80}, output: { risk: 9 } },
  { input: { cpu: 40 , ram: 80}, output: { risk: 8 } },
  { input: { cpu: 40 , ram: 80}, output: { risk: 8 } },
  { input: { cpu: 40 , ram: 80}, output: { risk: 8 } },
  { input: { cpu: 40 , ram: 80}, output: { risk: 8 } },
  { input: { cpu: 30 , ram: 80}, output: { risk: 7 } },
  { input: { cpu: 25 , ram: 80}, output: { risk: 6 } },
  { input: { cpu: 20 , ram: 20}, output: { risk: 5 } },
  { input: { cpu: 20 , ram: 10}, output: { risk: 5 } },
  { input: { cpu: 15 , ram: 10}, output: { risk: 4 } },
  { input: { cpu: 9 , ram: 10}, output: { risk: 0 } },
  { input: { cpu: 4 , ram: 10}, output: { risk: 0 } },
  { input: { cpu: 3 , ram: 10}, output: { risk: 0 } },
  { input: { cpu: 2 , ram: 10}, output: { risk: 0 } },
  { input: { cpu: 1 , ram: 10}, output: { risk: 0 } }
  
]);
const output = NN.run({ cpu: arg[1], ram: arg[2] });

console.log(arg[0] + " | CPU Alert Status");
console.log("--------------------------------------------");
var x = Math.round(output.probability) * 100;
var z = "" + arg[0];

if(output.probability > 0.06322386115789413){
console.log("Instance : " + z);
console.log("Inquiry : " + arg[1] + "," + arg[2]);
console.log("AlertProbability : HIGH");
console.log("ActualProbability : " + output.risk);
}
else if((output.probability > 0.06245506927371025) & (output.probability < 0.4285868175445076)){
  console.log("Instance : " + z);
  console.log("Inquiry : " + arg[1] + "," + arg[2]);
  console.log("AlertProbability : MEDIUM");
  console.log("ActualProbability : " + output.risk);
}
else{
  console.log("Instance : " + z);
  console.log("Inquiry : " + arg[1] + "," + arg[2]);
  console.log("AlertProbability : LOW");
  console.log("ActualProbability : " + output.risk);
}