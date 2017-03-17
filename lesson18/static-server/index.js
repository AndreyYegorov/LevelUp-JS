'use strict';

const http = require('http'),
	  fs = require('fs'),
	  path = require('path');

const server = http.createServer((req, res) => {
    let rootPath = './public',
    	reqPath = req.url,
		filePath = (reqPath === '/') ? 
				   `${rootPath}/index.html` : 
				   `${rootPath}${reqPath}`;

    let extname = String(path.extname(filePath)).toLowerCase(),
    	mimeTypes = {
	        '.html': 'text/html',
	        '.js': 'application/javascript',
	        '.css': 'text/css',
	        '.png': 'image/png',
	        '.jpg': 'image/jpg',
	        '.gif': 'image/gif'
	    },
	    contentType = mimeTypes[extname];

    fs.readFile(filePath, (error, content) => {
    	let fileStatus;

        if (error) {
        	fileStatus = 404;

        	console.log(`${fileStatus} - there is no such file as ${reqPath}`);

            res.writeHead(fileStatus, { 'Content-Type': contentType });
            res.end();
        }
        else {
        	fileStatus = 200;

            res.writeHead(fileStatus, { 'Content-Type': contentType });
            res.end();
        }
    });
}).listen(3000, () => { console.log('Listen on 3000'); });