'use strict';

// 引入hello模块
let greet = require('./hello');

let s = 'Michael';

// greet(s);

/**
 * process也是Node.js提供的一个对象，它代表当前Node.js进程。通过process对象可以拿到许多有用信息:
 * > process === global.process;
 * true
 * > process.version;
 * 'v5.2.0'
 * > process.arch
 * 'x64'
 * > process.cwd(); //返回当前工作目录
 * '/Users/michael'
 * > process.chdir('/private/tmp'); // 切换当前工作目录
 * undefined
 * > process.cwd();
 * '/private/tmp'
 */

// if (typeof(window) === 'undefined') {
//     console.log('node.js')
// } else {
//     console.log('browser')
// }


/**
 * Node.js内置的fs模块就是文件系统模块，负责读写文件
 * 和所有其他Javascript模块不同的是，fs模块同事提供了异步和同步的方法。
 * 
 */

// 异步读文件
let fs = require('fs');
// fs.readFile('sample.txt', 'utf-8', function(err, data) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log(data)
//     }
// })

// console.log(process.version)
// console.log(process.platform)
// console.log(process.arch)
// console.log(process.cwd()) // 返回当前工作目录
// console.log(process.chdir('/private/tmp')) // 切换当前工作目录

// javascript程序是由事件驱动执行的单线程模型

// process.nextTick(function() {
//     console.log('nextTick callback')
// })

// console.log('nextTick wa set!')

// process.on('exit', function(code) {
//     console.log('about to exit with code: ' + code)
// })

/**
 * 异步读取时，传入的回调函数接收两个参数，当正常读取时，err参数为null，data参数为读取到的String。当读取发生错误时，err参数代表一个错误对象，data为undefined
 * 这也是Node.js标准的回调函数：第一个参数代表错误信息，第二个参数代表结果
 */

// 读取图片文件
// fs.readFile('sample.jpeg', function(err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//         console.log(data.length + ' bytes');
//         /**
//          * 当读取二进制文件时，不传入文件编码时，回调函数的data参数将返回一个Buffer对象。
//          * 在Node.js中，Buffer对象就是一个包含零个或任意个字节的数组
//          * 
//          * Buffer对象可以和String作转换，例如把一个Buffer对象转换成String
//          * 
//          */

//         let text = data.toString('utf-8');
//         console.log(text)

//         // 或者把一个String转换成Buffer
//         let buf = Buffer.from(text, 'utf-8');
//         console.log(buf)
//     }
// });

// 同步读文件
// try {
//     let data = fs.readFileSync('sample.txt', 'utf-8');
//     console.log(data)
// } catch (err) {
//     // 出错了
// }

/**
 * 将数据写入文件是通过fs.writeFile()实现的
 * writeFile()的参数依次为文件名、数据和回调函数。
 */
let data = 'Hello, Node.js';
// fs.writeFile('output.txt', data, function(err) {
//     if (err) {
//         console.log(err)
//     } else {
//         console.log('ok')
//     }
// })
// fs.writeFileSync('output.txt', data)

/**
 * 如果我们要获取文件大小，创建时间等信息，可以使用fs.stat()，它返回一个Stat对象
 */
// fs.stat('sample.txt', function(err, stat) {
//     if (err) {
//         console.log(err)
//     } else {
//         // 是否是文件
//         console.log('isFile: ' + stat.isFile())
//             // 是否是目录
//         console.log('isDirectory: ' + stat.isDirectory())
//         if (stat.isFile()) {
//             // 文件大小
//             console.log('size: ' + stat.size)
//                 // 创建时间,Date对象;
//             console.log('birth time: ' + stat.birthtime)
//                 // 修改时间，Date对象
//             console.log('modified time: ' + stat.mtime)
//         }
//     }
// })

/**
 * stream是Node.js提供的又一个仅在服务端可用的模块，目的是支持“流”这种数据结构
 * 标准输入流(stdin)   标准输出流(stdout)
 * 流的特点：数据是有序的，而且必须依次读取，或者依次写入，不能像Array那样随机定位
 * data事件表示流的数据已经可以读取了，end事件表示这个流已经到末尾了，没有数据可以读取了，error事件表示出错了
 */
// let rs = fs.createReadStream('sample.txt', 'utf-8');
// rs.on('data', function(chunk) {
//     console.log('DATA:')
//     console.log(chunk)
// })

// rs.on('end', function() {
//     console.log('END')
// })

// rs.on('error', function(err) {
//     console.log('ERROR: ' + err)
// })

// let ws1 = fs.createWriteStream('output1.txt', 'utf-8');
// ws1.write('使用Stream写入文本数据...\n');
// ws1.write('END.');
// ws1.end();

// let ws2 = fs.createWriteStream('output2.txt');
// ws2.write(new Buffer('使用Stream写入二进制数据...\n', 'utf-8'));
// ws2.write(new Buffer('END.', 'utf-8'));
// ws2.end();

/**
 * 就像可以把两个水管串成一个更长的水管一样，两个流也可以串起来。一个Readable流和一个Writeable流串起来后，所有
 * 的数据自动从Readable流进入Writable流，这种操作叫做pipe
 */


// let http = require('http');

// // 创建http server，并传入回调函数
// let server = http.createServer(function(request, response) {
//     // 回调函数接收request和response对象
//     // 获取HTTP请求的method和url
//     console.log(request.method + '： ' + request.url)
//         // 将HTTP响应200写入response，同时设置Content-Type: text/html
//     response.writeHead(200, { 'Content-Type': 'text/html' });
//     // 将HTTP响应的HTML内容写入response:
//     response.end('<h1>Hello world!</h1>');
// })

// // 让服务器监听8080端口
// server.listen(8080);

// console.log('Server is running at http://127.0.0.1:8080/');

// let url = require('url');
// console.log(url.parse('http://user:pass@host.com:8080/path/to/file?query=string#hash'))

let path = require('path');
// 解析当前目录
let workDir = path.resolve('.');
console.log(workDir)
    // 组合完整的文件路径
let filePath = path.join(workDir, 'pub', 'index.html')
console.log(filePath)