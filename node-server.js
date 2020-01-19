const http = require('http');
const url = require('url');
const path = require('path');
const queryString = require('querystring');
const fs = require('fs');
const server = http.createServer((req, res) => {
    const reqUrl = req.url;
    console.log('reqUrl:', reqUrl)
    res.writeHead(200, { "content-type": "text/html;charset=utf-8" });

    const page1 = fs.readFileSync('index.html', 'utf8');
    const page2 = fs.readFileSync('list.html', 'utf8');
    // fs.readFile('index.html', 'utf8', (err, data) => {
    //     if (err) throw err;
    //     res.write(data);
    //     res.end();

    // })
    switch (reqUrl) {
        case '/':
            res.write(page1);
            res.end();
            break;
        case '/list':
            res.write(page2);
            res.end();
            break;
        case '/login':
            let chunks = null;
            req.on('data', (chunk) => {
                chunks += chunk;
               
            })
            req.on('end', () => {
                console.log('end--chunks', chunks)
            })
            res.write(page1);
            res.end();
            break;
        default:
            let file = path.join(__dirname, req.url);
            if (fs.existsSync(file)) {
                fs.readFile(file, (err, data) => {
                    if (err) throw err;
                    res.end(data);
                })
            }
            break;
    }
    // const requrl = url.parse(req.url);
    // const queryStr = queryString.parse(requrl.query);
    // console.log('--',queryStr)
    // console.log('--',queryStr.name)

    // res.write('<h2> Hello World ! </h2>');
    // res.end();
})

server.listen(3008, () => {
    console.log('3008 ok ,server is runing')
})