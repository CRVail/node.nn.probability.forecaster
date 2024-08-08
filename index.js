#!/usr/bin/env node --no-warnings
const importCrawler = require('./src_modules/cmds/importer');
const dataCompiler = require('./src_modules/cmds/dataCompiler');
const validator = require('./src_modules/cmds/validator')
const common = require("./src_modules/dist/common");
const { stdin, stdout } = require('node:process');
const fs = require('fs');
const args = process.argv.slice(2);
if(args[0]){
    if(args[0] == "importCrawler")
    {
        if (args[1]){importCrawler.import(args[1])}
        else{console.log("missing argument \n 'please provide a path to your config file'")}
    }
    else if(args[0] == "dataCompiler")
    {
        if (args[1] == "nasa")
        {dataCompiler.nasa_compiler(args[2])}
        else
        {console.log("missing argument \n 'please provide a path to your config file'")}
    }
    else if(args[0] == "sampleConfig")
    {
        if(args[1] == "-f"){
            console.log(common.sampleConfig());
        }
        else{
            console.log(JSON.stringify(common.sampleConfig()));
        }
    }
    else if(args[0] == "testScript")
    {
        let data = JSON.parse(fs.readFileSync('fetched/exported-powerball-data-alignments (2024-05-20).json', 'utf8'));
        for(var i in data){
            process.stdout.write(data[i].output.num1.replace(undefined,0) + "\n"), 
            process.stdout.write(data[i].output.num2.replace(undefined,0) + "\n"), 
            process.stdout.write(data[i].output.num3.replace(undefined,0) + "\n"), 
            process.stdout.write(data[i].output.num4.replace(undefined,0) + "\n"), 
            process.stdout.write(data[i].output.num5.replace(undefined,0) + "\n"), 
            process.stdout.write(data[i].output.pb.replace(undefined,0) + "\n"), 
            process.stdout.write(data[i].input.orbit_id.replace(undefined,0) + "\n"),
            process.stdout.write(data[i].input.dist.replace(undefined,0) + "\n"),
            process.stdout.write(data[i].input.dist_min.replace(undefined,0) + "\n"),
            process.stdout.write(data[i].input.dist_max.replace(undefined,0) + "\n"),
            process.stdout.write(data[i].input.v_rel.replace(undefined,0) + "\n"),
            process.stdout.write(data[i].input.v_inf.replace(undefined,0) + "\n")
            process.stdout.write("\n\n\n");
        }
    }
    else if(args[0] == "validateTraining"){
        if (args[1]){validator.validateDataType(args[1])}
        else{console.log("missing argument \n 'please provide a path to your JSON file'")}
    }
    else{
        console.log("Sorry, it appears you've enterd an invalid argument.")
    }
}
else{
    console.log(common.about());
}
