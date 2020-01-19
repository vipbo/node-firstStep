const http = require('http');
const rs = http.get('http://www.baidu.com', res => {
    let chunks = null;
    res.on('data', (chunk) => {
        chunks += chunk;

    })
    res.on('end', () => {
        console.log('end--chunks', chunks)
    })
})