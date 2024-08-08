#!/usr/bin/env node
const fs = require('fs');
const fsPromises = require('node:fs/promises');

let dt = JSON.parse(fs.readFileSync('fetched/logs-insights-results.json', 'utf8'));
var totCNT = 0; var referrerCNT = 0; var diffrefferrCNT = 0; var elseCNT = 0;
for(var keyItem in dt){
    totCNT = totCNT + 1;
    var e = JSON.parse(JSON.stringify(dt[keyItem].message))
    if(e.includes("referer: 'https://filebound-dashboard.tasconline.com/'")){
        referrerCNT = referrerCNT + 1;
    }
    else if (e.includes("referer:")){
        diffrefferr = diffrefferr + 1;
    }
    else{
        elseCNT = elseCNT + 1;
    }
}

console.log("TOTAL COUNT:   " + totCNT);
console.log("FB REF COUNT:  " + referrerCNT);
console.log("DF REF  COUNT: " + diffrefferrCNT);
console.log("ELSE COUNT:    " + elseCNT);



