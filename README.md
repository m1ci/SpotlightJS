# SpotlightJS

Spotlight is pure JavaScript client for the DBpedia Spotlight service.
It is implemented in NodeJS.

If you want to try the module or contribute improving it, you are welcome.

## Usage

    var Spotlight = require('./lib/Spotlight');
    
    new Spotlight().annotate('JSON', 'application/json', 0.2, 20, function(data){
        console.log('annotate: ' + JSON.stringify(data));
    });
    
## Install

You can install it by cloning the repository using git clone or you can install it with npm.

    npm install SpotlightJS
