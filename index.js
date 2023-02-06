//we need a http server
const http = require('http');

const server = http.createServer((request, response) => {
    let path = "./views/";
    switch(request.url) {
        case '/':
            path += "index.html";
            console.info(path);
            response.end('multi-route-server-2');
            break;
        case '/about':
            path += "about.html";
            console.info(path);
            response.end('multi-route-server-2');
            break;
        case '/contact':
            path += "contact.html";
            console.info(path);
            response.end('multi-route-server-2');
            break;
        case '/depart':
            path += "depart.html";
            console.info(path);
            response.end('multi-route-server-2');
            break;
        case '/subscribe':
            path += "subscribe.html"
            console.info(path);
            response.end('multi-route-server-2');
            break;
        case '/about-me':
            // this is a redirect for a deprecated route
            console.info('redirect to /about');
            response.statusCode = 301;
            response.setHeader('Location', '/about');
            response.end();
            break;
        default:
            path += "404.html";
            console.info(path);
            response.end('multi-route-server-2');
            break;
    }
});

server.listen(3000, 'localhost', () => {
    console.log('listening on port 3000.')
});
