# IMPORTANT
This is a private solution I am publishing upon request. I will not be maintaining it. This solution contains both data mining/web scrapping tools combined with a Neural Network forecasting tools. Using this tool, you can scrape the web for metrics and training data, format the data to work with multiple brainjs forecasting functions, and output a result. 

This is all done via cli commands. 

THIS SOLUTION IS NOT MEANT FOR DISTRIBUTION. PUBLISHED UPON REQUEST.

# node.nn.probability.forecaster
This repo contains a probability forecaster I developed using brainjs. The solution pulls data, such as space weather and natural events as arguments (NEO positional arguments, celestial events. moon phases, tidal movements, etc) into an array that can be used to forecast probabilities based on pattern recognition.   



# CLI Configured Commands
"bin": {
    "run-aiio": "index.js",
    "run-sample-nn": "samples/nn.js",
    "run-sample-lstm": "samples/lstm.js",
    "run-sample-lstm-ts": "samples/lstm-ts.js",
    "run-builder": "samples/builder.js",
    "run-combiner": "samples/combiner.js",
    "run-pbNNt": "samples/pbNNt.js",
    "rundmc": "samples/poc.lstmts.js",
    "chkl": "samples/test.js"
  },


# Sample Forecasting -> Powerball
Just for fun, I ran these inputs against historical powerball data to see what powerball numbers the tool would forecast. Never checked to see if they worked.

INPUT:
        <D>  | dateRef_string
        <NE> | near-earth-objects.position.fullname
        <W>  | target-weather.barometric.percipitation.humidity.winds.temp
        <NO> | near-target-oceanic-events.tides?temp???
        <M>  | target-moon.cycle.position  
        <P>  | planetary.positions
    
OUTPUTS:
        dateRef_string,
        Num1,
        Num2,
        Num3,
        Num4,
        Num5,
        Powerball,
        PowerPlay
