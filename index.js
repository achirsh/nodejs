var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var crypto = require('crypto');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=utf-8',
        'Access-Control-Allow-Origin': '*'
    });

    var path = url.parse(req.url, true);

    if (path.pathname == '/medium.m3u8') {
        const { key } = path.query
        const value = Buffer.from(key, 'base64').toString('utf-8')
        if (value == 'hello') {
            res.write(Buffer.from('https://achirsh.github.io/videos/demo.m3u8').toString('base64'));
        } else {
            res.write('');
        }
        res.end();
    }
})

server.listen(8888, function() {
    console.log('listening on *:8888');
})