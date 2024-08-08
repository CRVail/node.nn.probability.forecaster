#!/usr/bin/env node
const fs = require('fs');
const brain = require('brain.js');
const { LSTM } = brain.recurrent;
const arg = process.argv.slice(2);
arg[0] = arg[0];

// create configuration for training
const config = {
  iterations: 1,
  log: true,
  logPeriod: 1,
  layers: [10],
};

let dt = JSON.parse(fs.readFileSync('data_modules/powerball/powerball.json', 'utf8'));
const trainingSet = dt.data.powerball.map((e) => {
    const date = e.Date;
    const inp = date + "," + e.Num1 + "," + e.Num2 + "," + e.Num3 + "," + e.Num4 + "," + e.Num5 + "," + e.Powerball + "," + e.PowerPlay;
    const obj = brain.traininSet = {
      input: inp,
      output: true
    };
    return obj;
});
console.log(trainingSet);

// create data which will be used for training
const data = [
  { input: 'CPU for the instance is running at 99%', output: 'failue' },
  { input: 'CPU for the instance is running at 89%', output: 'failue' },
  { input: 'CPU for the instance is running at 79%', output: 'failue' },
  { input: 'CPU for the instance is running at 69%', output: 'failue' },

  { input: 'CPU for the instance is running at 69%', output: 'alert' },
  { input: 'CPU for the instance is running at 59%', output: 'alert' },
  { input: 'CPU for the instance is running at 49%', output: 'alert' },
  { input: 'CPU for the instance is running at 39%', output: 'alert' },

  { input: 'CPU for the instance is running at 29%', output: 'OK' },
  { input: 'CPU for the instance is running at 19%', output: 'OK' },
  { input: 'CPU for the instance is running at 9%', output: 'OK' },
  { input: 'CPU for the instance is running at 1%', output: 'Ok' }

];

// the thing we would test
const test = "CPU for the instance is running at 49%";

const PBtest = brain.traininSet = {
  date: '1/15/2011',
    b1: '22',
    b2: '13',
    b3: '9',
    b4: '37',
    b5: '23',
    pb: '31',
    pp: '3'
}

const network = new LSTM();
//network.train(data, config);

const tst = "12/29/2010,18,37,20,16,3,30,2";

network.train(trainingSet, config);

const output = network.run(tst);


console.log(`Status ${output}`);
