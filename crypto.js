/**
 * crypto模块的目的是为了提供通用的加密和哈希算法
 */

/**
 * MD5是一种常用的哈希算法，用于给任意数据一个“签名”。这个签名通常用一个十六进制的字符串表示
 */

/**
 * update()方法默认字符串编码为UTF-8，也可以传入Buffer。
 * 如果要计算SHA1，只需要把'md5'改成'sha1'，就可以得到SHA1的结果1f32b9c9932c02227819a4151feed43e131aca40。
 * 还可以使用更安全的sha256和sha512。
 */
const crypto = require('crypto');

// const hash = crypto.createHash('md5');

// // 可任意多次调用update():
// hash.update('Hello, world!');
// hash.update('Hello, nodejs!');

// console.log(hash.digest('hex')); // 7e1977739c748beac0c0fd14fd26a544

/**
 * Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密匙：
 */

// const hmac = crypto.createHmac('sha256', 'secret-key');

// hmac.update('Hello, world!')
// hmac.update('Hello, nodejs!')
// console.log(hmac.digest('hex'));

/**
 * AES是一种常用的对称加密算法，加解密都用同一个密匙。crypto模块提供了AES支持，但是需要封装好函数
 */

function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

var data = 'Hello, this is a secret message!';
var key = 'Password!';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log('Plain text: ' + data);
console.log('Encrypted text: ' + encrypted);
console.log('Decrypted text: ' + decrypted);