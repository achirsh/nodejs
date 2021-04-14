let [fs, url, path, http] = [
    require('fs'),
    require('url'),
    require('path'),
    require('http')
]

// 从命令行参数获取root目录，默认是当前目录
let root = path.resolve(process.argv[2] || '.');
console.log('Statci root dir: ' + root)

// 创建服务器
let server = http.createServer(function(request, response) {
    // 获取url的path
    let pathname = url.parse(request.url).pathname;
    // 获得对应的本地文件路径
    let filepath = path.join(root, pathname);
    // 获取文件状态
    fs.stat(filepath, function(err, stats) {
        if (!err && stats.isFile()) { // 没有出错并且文件存在：
            console.log('200 ' + request.url)
                // 发送200响应
            response.writeHead(200);
            // 将文件流导向response
            fs.createReadStream(filepath).pipe(response)
        } else {
            console.log('404 ' + response.url)
            response.writeHead(404)
            response.end('404 Not Found')
        }
    })
})

server.listen(8080);

console.log('Server is running at http://127.0.0.1:8080/');