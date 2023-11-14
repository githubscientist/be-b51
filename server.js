// import the module http
const http = require('http');

let notes = [
    {
        id: 1,
        content: 'backend using node.js',
        important: true
    },
    {
        id: 2,
        content: 'node.js is a open source',
        important: false,
    },
    {
        id: 3,
        content: 'simple web server using node.js',
        important: true
    },
    {
        id: 4,
        content: 'express makes backend restful painless',
        important: true
    },
    {
        id: 5,
        content: 'backend restful using nodejs will grow complex',
        important: false
    }
];

// create a server
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(notes));
});

// define the server hostname and port number
const hostname = '127.0.0.1'; // localhost
const port = 3001;

// make the server to listen to the defined portnumber
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});