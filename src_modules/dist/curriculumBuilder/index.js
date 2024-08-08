#!/usr/bin/env node
const fs = require('fs');
const brain = require('brain.js');
const { LSTM } = brain.recurrent;
let powerballData = JSON.parse(fs.readFileSync('data_modules/powerball/powerball.json', 'utf8'));
let planetaryData = JSON.parse(fs.readFileSync('fetched/planetary.json', 'utf8'));
let neoData = JSON.parse(fs.readFileSync('fetched/neo.json', 'utf8'));

let neoDatav3 = JSON.parse(fs.readFileSync('fetched/neo2.json', 'utf8'));
let planetaryDatav3 = JSON.parse(fs.readFileSync('fetched/planetary2.json', 'utf8'));
let pbNNv3 = JSON.parse(fs.readFileSync('data_modules/pbNNtv3.json', 'utf8'));
let pbNNv3T = JSON.parse(fs.readFileSync('data_modules/pbNNtv3-T.json', 'utf8'));


  module.exports = {
    powerballDataLSTM: function(){
        return new Promise((resolve,reject) => {
            const trainingSet = powerballData.data.powerball.map((e) => {
                const date = e.Date;
                const inp = date + "," + e.Num1 + "," + e.Num2 + "," + e.Num3 + "," + e.Num4 + "," + e.Num5 + "," + e.Powerball + "," + e.PowerPlay;
                const obj = brain.traininSet = {
                  input: inp,
                  output: true
                };
                return obj;
            });
            resolve(trainingSet);
        })        
    },
    powerballDataNN: function(){
        return new Promise((resolve,reject) => {
            const trainingSet = powerballData.data.powerball.map((e) => {
                const date = e.Date;
                const inp = date + "," + e.Num1 + "," + e.Num2 + "," + e.Num3 + "," + e.Num4 + "," + e.Num5 + "," + e.Powerball + "," + e.PowerPlay;
                const obj = brain.traininSet = {
                  input: inp,
                  output: true
                };
                return obj;
            });
            resolve(trainingSet);
        }) 
    },
    powerballDataLSTMTS: function(){
        trainingSet = [];
        return new Promise((resolve,reject) => {
            var myobject = powerballData.data.powerball;
            for(var i in myobject){
                trainingSet.push( [
                    Number(+myobject[i].Num1), 
                    Number(+myobject[i].Num2), 
                    Number(+myobject[i].Num3), 
                    Number(+myobject[i].Num4), 
                    Number(+myobject[i].Num5), 
                    Number(+myobject[i].Powerball), 
                    Number(+myobject[i].PowerPlay)
                ]
                );
                //trainingSet.push(obj);
            }
            resolve(trainingSet);
        }) 
    },
    powerballDataJSON: function(){
        return powerballData.data.powerball;
       // return new Promise((resolve,reject) => {
       //     var myobject = powerballData.data.powerball;
        //    resolve(myobject);
       // });
    },
    planetaryJSON: function(){
        return planetaryData;
       // return new Promise((resolve,reject) => {
       //     var myobject = powerballData.data.powerball;
        //    resolve(myobject);
       // });
    },
    neoJSON: function(){
        return neoData;
       // return new Promise((resolve,reject) => {
       //     var myobject = powerballData.data.powerball;
        //    resolve(myobject);
       // });
    },
    planetaryJSONv3: function(){
        return planetaryDatav3;
    },
    neoJSONv3: function(){
        return neoDatav3;
       // return new Promise((resolve,reject) => {
       //     var myobject = powerballData.data.powerball;
        //    resolve(myobject);
       // });
    },
    pbNNv3: function(test){
        if(test == true){
            console.log("[test = true] argument was made indicating that this is a test run.");
            console.log("A smaller dataset will be used for processing.");
            return pbNNv3T;
        }
        else{
            return pbNNv3;
        }
    }
  }