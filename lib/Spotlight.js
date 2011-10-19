var http = require('http');

module.exports = Spotlight;
function Spotlight() {}

Spotlight.prototype.annotate = function(text, accept, confidence, support, callback) {
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
        path: '/rest/annotate?text='+text+'&confidence='+confidence+'&support='+support,
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
            callback(JSON.parse(result));
        });
    });
    req.end();
};