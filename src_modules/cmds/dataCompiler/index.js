#!/usr/bin/env node --no-warnings
var fs = require('fs');
const { stdin, stdout } = require('node:process');
const cliProgress = require('cli-progress');
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
const multibar = new cliProgress.MultiBar({
    clearOnComplete: false,
    hideCursor: true,
    format: ' {bar} | {libraryRef} | {value}/{total}',
}, cliProgress.Presets.shades_grey);

module.exports = {
    nasa_compiler1: async function(){
        var dt = await nasa_date_formatter(new Date("2024-May-03 13:55"));
        var dt1 = await nasa_date_formatter(new Date("2024-05-03T00:00:00").addDays(1));
        console.log(dt + "\n" + dt1);
        
      //  console.log(await nasa_neo_positional_alignments("body=ALL", "2024-05-03", "2024-05-04"))
    },    
    nasa_compiler: async function(dataPath){
        var dataWriter = [];
        return new Promise(async function (resolve, reject) {
            var primeData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
            process.stdout.write("\n[dataCompiler]([TARGET-DATA]<=>[NASA])" + "\n");
            process.stdout.write("[RESOLVING][ALIGNMENTS]" + "\n");
            var progTotal = Object.keys(primeData).length;
            var createTrainingObj = []; 
            var cnt = 0;var subCnt = 0;
            const b2 = multibar.create(progTotal, 0);               
            for(var i in primeData){
                    cnt = cnt + 1;
                    var b2msg = "processing nasa alignments (" + i + ")";
                    b2.update(cnt, {libraryRef:b2msg})
                var objOutputs = {
                    num1: primeData[i].num1,
                    num2: primeData[i].num2,
                    num3: primeData[i].num3,
                    num4: primeData[i].num4,
                    num5: primeData[i].num5,
                    pb: primeData[i].pb
                }
                
                var df = await nasa_date_formatter(new Date(primeData[i].date));
                var dt = await nasa_date_formatter(new Date(primeData[i].date).addDays(1));;
                
              await Promise.all([
                    nasa_neo_positional_alignments("body=ALL", df, dt), 
                    nasa_neo_positional_alignments("neo=true", df, dt)
                ]).then(values => {
                    subCnt = subCnt + 1;                    
                    for(var b in values){                    
                        for(var f in values[b]){
                            try{
                                    var objInputs = {
                                        orbit_id: String(values[b][f]["orbit_id"]),
                                        dist:  String(values[b][f]["dist"]),
                                        dist_min:  String(values[b][f]["dist_min"]),
                                        dist_max:  String(values[b][f]["dist_max"]),
                                        v_rel:  String(values[b][f]["v_rel"]),
                                        v_inf:  String(values[b][f]["v_inf"])
                                    }
                                    var createIterationLINE = {
                                        input: objInputs,
                                        output: objOutputs
                                    }
                                    createTrainingObj.push(createIterationLINE);
                                }
                            catch(err){
                                    var oj = {
                                        dateFrom: df,
                                        dateTo: dt,
                                        error: err 
                                    }           
                                    fs.appendFileSync('./fetched/primeLogs.json', JSON.stringify(errorObject));
                            }
                        }
                   }             
                   if(cnt == progTotal){
                       b2.update(cnt, {libraryRef:"building curriculum file"})
                        var datetime = new Date();
                        multibar.stop();
                        var fileName = "./fetched/exported-" + primeData[i].libraryRef +  "-alignments (" + datetime.toISOString().slice(0,10) + ").json";
                        fs.writeFile(fileName, JSON.stringify(createTrainingObj), () => { 
                            console.log("File Created. | Length=" + createTrainingObj.length);
                            console.log("File Path= " + fileName);
                            resolve("Process Completed."); 
                        });
                        
                   }              
                })
            }
            
        })
    }
}
async function nasa_neo_positional_alignments(ref, df_alignment, dt_alignment){
    return new Promise((resolve, reject) =>{
        var dataWriter = []; var cnt = 0;
        var url = "https://ssd-api.jpl.nasa.gov/cad.api?"+ ref +"&date-min="+ df_alignment +"&date-max="+ dt_alignment;
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
            var resObj = JSON.parse(JSON.stringify(y));
            var QRef = [];
            var progTotal = Object.keys(resObj).length;
            var cnt = 0;
            for(var i in resObj.data)
            { 
                cnt = cnt + 1;
                var item = {
                    des: resObj.data[i][0],
                    orbit_id: resObj.data[i][1],
                    jd: resObj.data[i][2],
                    cd: resObj.data[i][3],
                    dist: resObj.data[i][4],
                    dist_min: resObj.data[i][5],
                    dist_max: resObj.data[i][6],
                    v_rel: resObj.data[i][7],
                    v_inf: resObj.data[i][8]
                }                
                QRef.push(item)
            };
            dataWriter.push(QRef);
            resolve(dataWriter[0]);
        }).catch(err => {
            var errorObject = {
                id: String(cnt),
                url: String(url),
                error: String(err)
            }
            fs.appendFileSync('./fetched/logs.json', JSON.stringify(errorObject));
        });
    });
}
async function nasa_date_formatter(date){
    return new Promise((resolve,reject) =>{
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDay();
        if(String(month).length == 1)
        {month = "0" + month}
        if(String(day).length == 1)
        {day = "0" + day}
        resolve(year+"-"+month+"-"+day);
    })
}