const { createServer } = require('node:http');
const { readFile } = require('node:fs');
const { join } = require('node:path');

const hostname = '127.0.0.1';
const port = 8080;

const server = createServer((req, res) => {
    let filePath = './public'; // Assuming your HTML files are in a 'public' directory
    switch (req.url) {
        case '/':
            filePath += '/index.html';
            break;
        case '/about':
            filePath += '/about.html';
            break;
        case '/contact-me':
            filePath += '/contact-me.html';
            break;
        default:
            filePath += '/404.html'; // Make sure you have a 404.html file
            break;
    }

    readFile(join(__dirname, filePath), (err, content) => {
        if (err) {
            res.writeHead(500);
            res.end('Server Error');
            return;
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(content);
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});



