var static = require('node-static')
  , http = require('http');

// Server from current directory...
var fileServer = new static.Server('./', {cache: false});

http.createServer(function(req, res) {
  req.addListener('end', function() {

  	console.log(req.method+' request for '+req.url);
  	// Make sure, app.js cant be requested
  	if (req.url == '/app.js') fileServer.serveFile('/index.html', 200, {}, req, res);
    fileServer.serve(req, res);

  });
}).listen(8090);

console.log('Start listening on port 8090');