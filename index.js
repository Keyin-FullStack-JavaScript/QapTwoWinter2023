// we need a http server
const http = require('http');
// Put the routes in their own file
const routes = require('./routes.js');
// add a global for debugging
global.DEBUG = false;

const server = http.createServer((request, response) => {
    let path = "./views/";
    switch(request.url) {
        case '/':
            path += "index.html";
            if(DEBUG) console.info(path);
            response.statusCode = 200;
            routes.indexPage(path, response);
            break;
        case '/about':
            path += "about.html";
            if(DEBUG) console.info(path);
            response.statusCode = 200;
            routes.aboutPage(path, response);
            break;
        case '/contact':
            path += "contact.html";
            if(DEBUG) console.info(path);
            response.statusCode = 200;
            routes.contactPage(path, response);
            break;
        case '/depart':
            path += "depart.html";
            if(DEBUG) console.info(path);
            response.statusCode = 200;
            routes.departPage(path, response);
            break;
        case '/subscribe':
            path += "subscribe.html"
            if(DEBUG) console.info(path);
            response.setHeader('Set-cookie', 'subscription=New');
            routes.subscribePage(path, response);
            break;
        case '/about-me':
            // this is a redirect for a deprecated route
            if(DEBUG) console.info('redirect to /about');
            response.statusCode = 301;
            response.setHeader('Location', '/about');
            response.end();
            break;
        default:
            path += "404.html";
            if(DEBUG) console.info(path);
            response.statusCode = 404;
            routes.fourOfourPage(path, response);
            break;
    }
});

server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000.')
});
