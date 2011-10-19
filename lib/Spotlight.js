var http = require('http');

module.exports = Spotlight;
function Spotlight() {}

/*********************************
 @_function(1): 'annotate' - used to annotate text. For each annotation you get n-best candidates.
 @_function(2): 'candidates' - use to annotate text. For each annotation you get the best candidate.
 @_function(3): 'disambiguate' - not working.
 @accept: input text used to annotate.
 @confidence: threshold for the min similarity score.
 @support: min number of inlinks.
 @callback: callback function. Called when got the results.
*********************************/
Spotlight.prototype.run = function(text, _function, accept, confidence, support, callback) {
    
    var content_type ='';
    if(accept == 'application/json')
        content_type = 'application/json';
    else if(accept == 'application/xhtml+xml')
        content_type = 'application/json';
    else if(accept == 'text/xml')
        content_type = 'text/xml';
    else if(accept == 'text/html')
        content_type = 'text/html';
    else
        content_type = 'application/json';

    var options = {
        host: 'spotlight.dbpedia.org',
        port: 80,
        path: '/rest/'+_function+'?text='+text+'&confidence='+confidence+'&support='+support,
        method:'GET',
        headers : {'Accept':content_type}
    };
    var req = http.request(options, function(res){
        var result = '';
        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.on('data', function (chunk) {
            result += chunk;
        });
        res.on('end', function (chunk) {
            callback(result);
        });
    });
    req.end();
};