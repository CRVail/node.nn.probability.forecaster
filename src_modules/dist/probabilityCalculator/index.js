#!/usr/bin/env node
const brain = require('brain.js');
const curriculumBuilder = require("../src_modules/dist/curriculumBuilder");
const fs = require('fs');

build();
async function build(){
    console.log(curriculumBuilder.powerballDataJSON);
    

}