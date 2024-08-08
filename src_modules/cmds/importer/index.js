#!/usr/bin/env node --no-warnings
var fs = require('fs');
const { stdin, stdout } = require('node:process');
const cliProgress = require('cli-progress');

module.exports = {    
    import: async function(configPath){
        return new Promise(async function (resolve, reject) {
            if (configPath) {
                let configurations = JSON.parse(fs.readFileSync(configPath, 'utf8'));
                var runningTitle = "\n[importCrawler][" + configurations.configName + "]\n";
                process.stdout.write(runningTitle + "\n");
                for (var config in configurations.targets) {
                    console.log(await requestEndpoint(
                        configurations.targets[config].endpoint,
                        configurations.targets[config].schema,
                        configurations.targets[config].targetName) + " " + configurations.configName + " Task " + config + "\n");
                }
            }
        })
    }
}
async function requestEndpoint(endpoint, schema, targetName){
    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    return new Promise((resolve,reject) => {
        process.stdout.write("[GET][" + endpoint + "]" + "\n");
        var cnt = 0; var setFileName = ""; var dataWriter = [];
        fetch(endpoint)
        .then(response => response.json())
        .then(results => {
            process.stdout.write("[SUCCESS][RETURNED]" + results + "" + "\n");
            for(var primeKey in schema)
            {
                process.stdout.write("[RUNNING][" + targetName + "][SCHEMA][" + primeKey + "]" + "\n\n");
                var primeKeyRef = schema[primeKey].primaryKey;
                if(results.hasOwnProperty(primeKeyRef)){
                    var progTotal = Object.keys(results.data).length;
                    bar1.start(progTotal, 0);
                    for(var i in results[primeKeyRef]){
                        cnt = cnt + 1;
                        bar1.update(cnt);
                        var obj = {};
                        for(var n in schema[primeKey].childKeys){
                            if(results[primeKeyRef][i].hasOwnProperty(schema[primeKey].childKeys[n].childKey)){
                                const newKey = schema[primeKey].childKeys[n].keyName;
                                const test = JSON.parse(JSON.stringify(schema[primeKey].childKeys[n]));
                                obj.id = cnt;
                                obj.libraryRef = String(targetName);
                                setFileName = String(targetName).replace(" ","-");
                                if(test.format){
                                    var x = results[primeKeyRef][i][schema[primeKey].childKeys[n].childKey];
                                    const xArray = x.split(test.format.typeArg);
                                    var num = 0;
                                    xArray.map(v => {
                                        num = num + 1;
                                        var ConfigKeyName = String(newKey + num);
                                        if(num == xArray.length){
                                            ConfigKeyName = "pb";
                                        }
                                        obj[ConfigKeyName] = v;
                                        return "set";
                                    });
                                }
                                else{
                                    var ConfigKeyValue = String(results[primeKeyRef][i][schema[primeKey].childKeys[n].childKey]);
                                    obj[newKey] = ConfigKeyValue;                                                    
                                }
                            }
                        }
                        dataWriter.push(obj);
                    }
                    
                }
            }
        })
        .then(()=>{
            bar1.stop();
            var file = "./fetched/" + setFileName + ".json";
                                    fs.writeFile(file, JSON.stringify(dataWriter), () => { 
                                        process.stdout.write("\n[FILE CREATED] \"" + setFileName + "\" | Length=" + dataWriter.length + "\n");
                                        resolve("Completed");
                                    });
        })
    });
}