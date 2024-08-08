#!/usr/bin/env node
const brain = require('brain.js');
const curriculumBuilder = require("../src_modules/dist/curriculumBuilder");
const fs = require('fs');
const fsPromises = require('node:fs/promises');

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

async function build(){
    return new Promise((resolve, reject) => {
    var myobject = curriculumBuilder.powerballDataJSON();
    var index = "planetary.positions"
    var cnt = -1;
    var dataWriter = [];
    for(var i in myobject){
        const dt = myobject[i].Date;
        const dateMin = new Date(myobject[i].Date)
        const dateMax = dateMin.addDays(1);
        const formattedDateMin = dateMin.toISOString().split('T')[0];
        const formattedDateMax = dateMax.toISOString().split('T')[0];
        var  url = "https://ssd-api.jpl.nasa.gov/cad.api?body=ALL&date-min=" + formattedDateMin + "&date-max=" + formattedDateMax + "&fullname=true";
            try {
                fetch(url)
                    .then(x => {
                        try{ 
                            var z = x.json();
                            return z;
                        }
                        catch(err){
                            var errorObject = {
                                id: String(cnt),
                                url: String(url),
                                error: String(err)
                            }
                            fs.appendFileSync('./fetched/logs.json', JSON.stringify(errorObject));
                        }
                    })
                    .then(async function (y) {
                        var obj = JSON.parse(JSON.stringify(y));
                        var QRef = [];
                        obj.data.forEach(function(element) 
                        { 
                            var item = {
                                des: element[0],
                                orbit_id: element[1],
                                jd: element[2],
                                cd: element[3],
                                dist: element[4],
                                dist_min: element[5],
                                dist_max: element[6],
                                v_rel: element[7],
                                v_inf: element[8],
                                t_sigma_f: element[9],
                                body: element[10],
                                h: element[11]
                            }
                            
                            QRef.push(item)
                        });
                        var objKey = {
                                        id: String(cnt),
                                        quantum_index: String(index), 
                                        inquiry_alignment: String(dt),  //Date
                                        source_alignment: String(formattedDateMin), //Date
                                        request_detals: String(url),
                                        data: QRef
                        }
                        dataWriter.push(objKey);
                        cnt = cnt + 1;
                        if (cnt == myobject.length -1){ console.log("Resolving"); resolve(dataWriter);}
                }).catch(err => {
                    cnt = cnt + 1;
                    var errorObject = {
                        id: String(cnt),
                        url: String(url),
                        error: String(err)
                    }
                    fs.appendFileSync('./fetched/logs.json', JSON.stringify(errorObject));
                });
    
            }
            catch (err) {
                var errorObject = {
                    id: String(cnt),
                    url: String(url),
                    error: String(err)
                }
                fs.appendFileSync('./fetched/logs.json', JSON.stringify(errorObject));
            }
        
    }
})
}

async function run(){
    return await new Promise((resolve,reject)=>{
        Promise.all([build()])
        .then(data =>{
            fs.writeFile(`./fetched/planetary2.json`, JSON.stringify(data), () => { 
                console.log("File Created. | Length=" + data.length);
                resolve("Process Completed."); 
            });
        });
    })
}
console.log(run());