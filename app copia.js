var http = require('http');
http.createServer(function (req, res) {
	var fs = require('fs');
	var myfiles = [];
  	res.writeHead(200, {'Content-Type': 'text/plain'});
	fs.readdir('/Pruebas/', function (err, files) { if (err) throw err;
	  files.forEach( function (file) {
	    myfiles.push(file);
	    res.write(file + '<br>');
	  });
	  console.log(myfiles);
	  res.end();
	});


  //res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');