#!/usr/bin/env node
const brain = require('brain.js');
const curriculumBuilder = require("../src_modules/dist/curriculumBuilder");
const fs = require('fs');
const fsPromises = require('node:fs/promises');
const { ppid } = require('process');

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
async function build(){
    var powerballDATA = curriculumBuilder.powerballDataJSON();
    var planetaryDATA = curriculumBuilder.planetaryJSONv3();
    var neoDATA = curriculumBuilder.neoJSONv3();
    return new Promise((resolve, reject) => {       
        var cnt = -1;
        var dataWriter = [];
        for(var i in powerballDATA){
            for(var l in planetaryDATA[0]){
                if(powerballDATA[i].Date == planetaryDATA[0][l].inquiry_alignment)
                {
                    for(var z in planetaryDATA[0][l].data){
                        var objA = {
                            id: String(cnt),
                            src: "planetary",
                            date: String(powerballDATA[i].Date),
                            num1: String(powerballDATA[i].Num1),
                            num2: String(powerballDATA[i].Num2),
                            num3: String(powerballDATA[i].Num3),
                            num4: String(powerballDATA[i].Num4),
                            num5: String(powerballDATA[i].Num5),
                            pb: String(powerballDATA[i].Powerball),
                            pp: String(powerballDATA[i].PowerPlay),
                            inquiry_alignment: planetaryDATA[0][l].inquiry_alignment,
                            orbit_id: planetaryDATA[0][l].data[z]["orbit_id"],
                            dist: planetaryDATA[0][l].data[z]["dist"],
                            dist_min: planetaryDATA[0][l].data[z]["dist_min"],
                            dist_max: planetaryDATA[0][l].data[z]["dist_max"],
                            v_rel: planetaryDATA[0][l].data[z]["v_rel"],
                            v_inf: planetaryDATA[0][l].data[z]["v_inf"],
                            h: planetaryDATA[0][l].data[z]["h"]
                        }
                        dataWriter.push(objA);
                    }                        
                }
            }
            for(var a in neoDATA[0]){
                if(powerballDATA[i].Date == neoDATA[0][a].inquiry_alignment)
                {
                    for(var z in neoDATA[0][a].data){
                        var objA = {
                            id: String(cnt),
                            src: "neo",
                            date: String(powerballDATA[i].Date),
                            num1: String(powerballDATA[i].Num1),
                            num2: String(powerballDATA[i].Num2),
                            num3: String(powerballDATA[i].Num3),
                            num4: String(powerballDATA[i].Num4),
                            num5: String(powerballDATA[i].Num5),
                            pb: String(powerballDATA[i].Powerball),
                            pp: String(powerballDATA[i].PowerPlay),
                            inquiry_alignment: neoDATA[0][a].inquiry_alignment,
                            orbit_id: neoDATA[0][a].data[z]["orbit_id"],
                            dist: neoDATA[0][a].data[z]["dist"],
                            dist_min: neoDATA[0][a].data[z]["dist_min"],
                            dist_max: neoDATA[0][a].data[z]["dist_max"],
                            v_rel: neoDATA[0][a].data[z]["v_rel"],
                            v_inf: neoDATA[0][a].data[z]["v_inf"],
                            h: neoDATA[0][a].data[z]["h"]
                        }
                        dataWriter.push(objA);
                    }                        
                }
            }
        }
        resolve(dataWriter);
    }).then(function (data) {
       
        fs.appendFileSync('data_modules/pbNNtv3.json', JSON.stringify(data));

    });
}
//build();
test();
function test(){
    var dt = new Date("2024-04-08");
    var s = dt.getTime();
    console.log("preConv" + dt)
    console.log(s);
   
    // var planetaryDATA = curriculumBuilder.planetaryJSONv3();
  //  for(var l in planetaryDATA[0]){
  //      var dt = new Date("2024-04-08");
  //      var s = dt.getTime();
  //      console.log("preConv" + dt)
  //      console.log(s);
  //  }
}