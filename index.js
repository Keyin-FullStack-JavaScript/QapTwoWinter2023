//we need a http server
const http = require('http');
// add a global for debugging
global.DEBUG = true;

// load the logEvents module
const logEvents = require('./logEvents');
// define/extend an EventEmitter class
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {};
// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on('log', (event, level, msg) => logEvents(event, level, msg));

const server = http.createServer((request, response) => {
    let path = "./views/";
    switch(request.url) {
        case '/':
            path += "index.html";
            myEmitter.emit('log', request.url, 'INFO', 'root of site was visited');
            console.info(path);
            response.end('multi-route-server-2');
            break;
        case '/about':
            path += "about.html";
            myEmitter.emit('log', request.url, 'INFO', 'route was visited');
            console.info(path);
            response.end('multi-route-server-2');
            break;
        case '/contact':
            path += "contact.html";
            myEmitter.emit('log', request.url, 'INFO', 'route was visited');
            console.info(path);
            response.end('multi-route-server-2');
            break;
        case '/depart':
            path += "depart.html";
            myEmitter.emit('log', request.url, 'INFO', 'route was visited');
            console.info(path);
            response.end('multi-route-server-2');
            break;
        case '/subscribe':
            path += "subscribe.html"
            myEmitter.emit('log', request.url, 'INFO', 'route was visited');
            console.info(path);
            response.end('multi-route-server-2');
            break;
        case '/about-me':
            // this is a redirect for a deprecated route
            myEmitter.emit('log', request.url, 'WARNING', 'deprecated route was visited');
            console.info('redirect to /about');
            response.statusCode = 301;
            response.setHeader('Location', '/about');
            response.end();
            break;
        default:
            path += "404.html";
            myEmitter.emit('log', request.url, 'ERROR', 'invalid route was visited');
            console.info(path);
            response.end('multi-route-server-2');
            break;
    }
});

server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000.')
});
