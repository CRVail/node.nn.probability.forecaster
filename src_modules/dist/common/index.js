#!/usr/bin/env node --no-warnings
var fs = require('fs');
let jsonPackage = JSON.parse(fs.readFileSync('package.json', 'utf8'));
let sampleConfig = JSON.parse(fs.readFileSync('examples/sampleConfig.json', 'utf8'));
module.exports = {
    title: function(){
            var text = "ai.io | QProb";
            return text    
    },
    cmds: function(){
            var obj = Object.keys(jsonPackage.bin);
            var text = "";
            obj.forEach((element) =>{
                text += element + "\n";
            })
            return text;            
    },
    about: function(){
            var text = "'"+ this.title +"' is a nodejs cli application that contains \n" +
                       "several data extraction, compiliation, probability tools that \n" +
                       "can be leveraged to run your own probability scenarios, \n" + 
                       "etc.\n\n" + 
                       "Using the Data Extraction tools, you can configure the \n" + 
                       "application to pull large datasets from any endpoint that \n" + 
                       "you wish to run your probability scenario through.\n\n" +
                       "The Compiler tools allow you to take the data you extracted, \n" + 
                       "format it, compile it, and prepare it for use by the built \n" +
                       "in Nueral Network.\n\n" +
                       "The Probability Tools (QProb) takes the data you've prepared \n" + 
                       "for the Nueral Network, and starts the AI training iterations. \n\n" + 
                       "Once the processes are complete, the 'ai-io | QProbs' will \n" + 
                       "output the results. You can optionally download the training \n" +
                       "tokens for future use as well.\n\n" + 
                       "To get started, type the command 'run-aiio -h' for a list of \n" +
                       "available commands.";           
            return text;            
    },
    sampleConfig: function(){
        return sampleConfig;
    },
    help: function(){
        var text = "[HELP CONTENT HAS NOT BEEN PROVIDED]";
        return text;
    },
    error: function(error){
        var text = "ERROR OCCURED! ("+this.title+")\n" + 
                   "[ERROR DETAILS]\n" + 
                   error +
                   "[END DETAILS]\n"; 
        return text;
    }
}