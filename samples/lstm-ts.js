#!/usr/bin/env node
const brain = require('brain.js');
const fs = require('fs');
const cliProgress = require('cli-progress');
const curriculumBuilder = require("../src_modules/dist/curriculumBuilder");
const { stdin, stdout } = require('node:process');
var Validator = require('jsonschema').Validator;
var v = new Validator();
var dataI = [];
let pbNNv3T = JSON.parse(fs.readFileSync('fetched/exported-powerball-data-alignments (2024-05-20).json', 'utf8'));
const multibar = new cliProgress.MultiBar({
    clearOnComplete: false,
    hideCursor: true,
    format: ' {bar} | {msg} | {value}/{total}',
}, cliProgress.Presets.shades_grey);

const trainingSet = pbNNv3T.map((e) => {
   // const date = e.Date;
    //const inp = date + "," + e.Num1 + "," + e.Num2 + "," + e.Num3 + "," + e.Num4 + "," + e.Num5 + "," + e.Powerball + "," + e.PowerPlay;
    const obj = brain.traininSet = 
      [
        Number(e.output.num1),
        Number(e.output.num2),
        Number(e.output.num3),
        Number(e.output.num4),
        Number(e.output.num5),
        Number(e.output.pb),
        Number(e.input.orbit_id),
        Number(e.input.dist)
      ];
    return obj;
});


//run(pbNNv3T);
//validate(pbNNv3T)
runNN(trainingSet);
//console.log(trainingSet)
async function validate(data){
    var schema = {
                    "input": {
                            "orbit_id": {"type": "string"},
                            "dist": {"type": "string"},
                            "dist_min": {"type": "string"},
                            "dist_max": {"type": "string"},
                            "v_rel": {"type": "string"},
                            "v_inf": {"type": "string"}
                    },
                    "output": {
                            "num1": {"type": "string"},
                            "num2": {"type": "string"},
                            "num3": {"type": "string"},
                            "num4": {"type": "string"},
                            "num5": {"type": "string"},
                            "pb": {"type": "string"}
                    }
                }
    v.addSchema(schema);
    var pc = Object.keys(data).length
    const b1 = multibar.create(pc, {msg:'Validating'})
    for(var i in data){
        b1.update(i)
        var s = v.validate(data[i], schema)
        //process.stdout.write(s);
        var err = Object.keys(s.errors).length
        //if(err){
           // console.log(s)
            fs.appendFileSync('./fetched/logs.json', JSON.stringify(s));
       // }
        //console.log(JSON.parse(s));
    }            

}
async function run(data){
        var cnt = 0; 
        var total = Object.keys(data).length;
        for(var i in data){
            cnt = cnt + 1;
            
            dataI.push( [
                Number(data[i].output.num1.replace(undefined,0)), 
                Number(data[i].output.num2.replace(undefined,0)), 
                Number(data[i].output.num3.replace(undefined,0)), 
                Number(data[i].output.num4.replace(undefined,0)), 
                Number(data[i].output.num5.replace(undefined,0)), 
                Number(data[i].output.pb.replace(undefined,0)), 
                Number(data[i].input.orbit_id.replace(undefined,0)),
                Number(data[i].input.dist.replace(undefined,0))//,
            //    Number(data[i].input.dist_min.replace(undefined,0)),
            //    Number(data[i].input.dist_max.replace(undefined,0)),
            //    Number(data[i].input.v_rel.replace(undefined,0))
            ]);
            if(cnt == total){
                runNN(dataI);
            }        
    }
}
async function buildTraining(){

}
async function runNN(data){
    const date = new Date();
    console.log ("started: " + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes());
    const NN = new brain.recurrent.LSTMTimeStep({
        inputSize: 8,
        hiddenLayers: [8, 8],
        outputSize: 8
    });    
    const config = {
        log: true,
        logPeriod: 100,
        errorThresh: 0.1, //default 0.01
        learningRate: 0.05, //default 0.001
        iterations: 1000,
       // callback: step => process.stdout.write(step)
        callback: async function(step){
        }
    }
    NN.train(data, config);
    let output = NN.forecast(data.flat(), 1);
    const endDate = new Date();
    console.log ("ended: " + endDate.getDay() + "/" + endDate.getMonth() + "/" + endDate.getFullYear() + "  " + endDate.getHours() + ":" + endDate.getMinutes());
    renderResult(output);
}
async function renderResult(data){
    var render = "\n\nPowerball Prediction:\n" +
                 "Ball 1: (" + Math.round(data[0][0]) + ")\n" +
                 "Ball 2: (" + Math.round(data[0][1]) + ")\n" +
                 "Ball 3: (" + Math.round(data[0][2]) + ")\n" +
                 "Ball 4: (" + Math.round(data[0][3]) + ")\n" +
                 "Ball 5: (" + Math.round(data[0][4]) + ")\n" +
                 "Powerball: (" + Math.round(data[0][5]) + ")\n" +
                 "Near Earth Object Prediction:\n" +
                 "orbit_id: " + Math.round(data[0][7]) + "\n" + 
                 "dist: " + data[0][8] + "\n" +
                 "dist-min: " + data[0][9] + "\n" +
                 "dist-max: " + data[0][10] + "\n" +
                 "v_rel: " + data[0][11] + "\n";
                 console.log(render);
}