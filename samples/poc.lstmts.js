#!/usr/bin/env node
const brain = require('brain.js');
const fs = require('fs');
const cliProgress = require('cli-progress');
const { stdin, stdout } = require('node:process'); //process.stdout.write([string])
let pbNNv3T = JSON.parse(fs.readFileSync('fetched/~exported-powerball-data-alignments (2024-05-18).json', 'utf8'));
const multibar = new cliProgress.MultiBar({
    clearOnComplete: false,
    hideCursor: true,
    format: ' {bar} | {msg} | {value}/{total}',
}, cliProgress.Presets.shades_grey);

async function validateTrainingData(trainingSet){
    for(var i in trainingSet){
        for(var e in trainingSet[i]){
            try{
                var numberConversion = Number(trainingSet[i][e]);
                var stringConversion = String(trainingSet[i][e]);
                var lengthVerifaction = String(trainingSet[i]);

                if(isNaN(trainingSet[i][e]))
                {
                    process.stdout.write(trainingSet[i][e] + "\n");
                }
            }
        catch(err){
            throw err;
        }
            
        }
    }
 }

 validateTrainingData(trainingSet)