// we need a http server
const http = require('http');
// Put the routes in their own file
const routes = require('./routes.js');
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
            if(DEBUG) console.info(path);
            myEmitter.emit('log', request.url, 'INFO', 'root of site was visited');
            response.statusCode = 200;
            routes.indexPage(path, response);
            break;
        case '/about':
            path += "about.html";
            if(DEBUG) console.info(path);
            myEmitter.emit('log', request.url, 'INFO', 'route was visited');
            response.statusCode = 200;
            routes.aboutPage(path, response);
            break;
        case '/contact':
            path += "contact.html";
            if(DEBUG) console.info(path);
            myEmitter.emit('log', request.url, 'INFO', 'route was visited');
            response.statusCode = 200;
            routes.contactPage(path, response);
            break;
        case '/depart':
            path += "depart.html";
            if(DEBUG) console.info(path);
            myEmitter.emit('log', request.url, 'INFO', 'route was visited');
            response.statusCode = 200;
            routes.departPage(path, response);
            break;
        case '/subscribe':
            path += "subscribe.html"
            if(DEBUG) console.info(path);
            myEmitter.emit('log', request.url, 'INFO', 'route was visited');
            response.setHeader('Set-cookie', 'subscription=New');
            routes.subscribePage(path, response);
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
            if(DEBUG) console.info(path);
            myEmitter.emit('log', request.url, 'ERROR', 'invalid route was visited');
            response.statusCode = 404;
            routes.fourOfourPage(path, response);
            break;
    }
});

server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000.')
});
