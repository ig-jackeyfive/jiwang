let axios = require('axios');
const { log } = require('console');
const fs = require("fs");
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    // baseURL: 'http://tu71ajix.xiaomy.net:29998',
    baseURL: 'http://192.168.1.106:8080',
    // 超时
    timeout: 600000,
    headers: {
        'Accept': '*/*'
    }
})

let keys = []
service
    .post(`/web/showDetail?pkgNum=${1}`)
    .then((res) => {
        // console.log(res.data.data);
        keys.push(res.data.data)
    })
    .catch(function(error) {
        console.log(error);
    });
for (let i = 0; i < 10; i++) {
    console.log(`/web/showDetail?pkgNum=${i}`);
    setTimeout(() => {

    }, i * 1000);
}
console.log(keys)
    // service
    //     .post(`/web/showInformation`)
    //     .then((res) => {
    //         // console.log(res.data.data);

//     })
//     .catch(function(error) {
//         console.log(error);
//     });



// fs.wirteFile有三个参数
// 1,第一个参数是要写入的文件路径
// 2,第二个参数是要写入得内容
// 3,第三个参数是可选参数,表示要写入的文件编码格式,一般就不写,默认就行
// 4,第四个参数是个回调函数  只有一个参数error,来判断是否写入成功