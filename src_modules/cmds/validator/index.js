#!/usr/bin/env node
const brain = require('brain.js');
const fs = require('fs');
const cliProgress = require('cli-progress');
const { stdin, stdout } = require('node:process'); //process.stdout.write([string])
const { isNumberObject, isKeyObject, isStringObject } = require('util/types');
const { isString, isNull, isArray } = require('util');
const { resolve } = require('path');

const multibar = new cliProgress.MultiBar({
    clearOnComplete: false,
    hideCursor: true,
    format: ' {bar} | {msg} | {value}/{total}',
}, cliProgress.Presets.shades_grey);

module.exports = {
    validateJSON: async function(){
        console.log("validateJSON");
    },
    validateTrainingSet: async function(){
        console.log("validateTrainingSet");
    },
    validateDataType: async function(pathToJSON){
        let dataset = JSON.parse(fs.readFileSync(pathToJSON, 'utf8'));

        const NumberObjBar = multibar.create(Object.keys(dataset).length, 0);
        const ObjectCountBar = multibar.create(Object.keys(dataset).length, 0);
        const ObjKeyCountBar = multibar.create(Object.keys(dataset).length, 0);
        const StringCountBar = multibar.create(Object.keys(dataset).length, 0);
        const NumberCountBar = multibar.create(Object.keys(dataset).length, 0);
        var cnt = 0;
        for(var subset in dataset){
            cnt = cnt + 1;
            NumberObjBar.update(cnt, { msg:'Target Dataset' }); 
            await determineType(dataset[subset]).then(async function (result){
                if(result == "isObjectKeys"){
                    for(var childSet1 in dataset[subset]){
                        await determineType(dataset[subset][childSet1]).then(async function(childResult1){
                            if(childResult1 == "isObjectKeys"){
                                for(var childSet2 in dataset[subset][childSet1]){
                                    await determineType(dataset[subset][childSet1][childSet2]).then(async function(childResult2){
                                        process.stdout.write(childResult2 + " | " + dataset[subset][childSet1][childSet2] + "\n");
                                    })
                                }
                            }
                           // process.stdout.write(childResult + "|" + JSON.stringify(dataset[subset][childSet]) + "\n");
                        });
                    }
                }
            });
            //process.stdout.write(dataset[subset] + " | " + await determineType(dataset[subset]) + "\n");
         
         
        }
    }
  } 
  async function determineType(getType){
    return new Promise((resolve, reject) => {
        if(isNumberObject(getType)){
            resolve("isNumberObject")
        }
        else if(isKeyObject(getType)){
            resolve("isKeyObject")
        }
        else if(isArray(getType)){
            resolve("isNull")
        }
        else if(Object.keys(getType)){
            console.log(Object.keys(getType))
          resolve("isObjectKeys")
       }
        else {
            if(isNaN(getType)){
                resolve("string")
            }
            else{
                resolve("number")
            }
        }
    });
  }