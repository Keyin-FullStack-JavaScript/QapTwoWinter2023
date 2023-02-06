const fs = require('fs');

// this is the index page
function indexPage(path, response) {
    displayFile(path, response);
}

//this is the about page
function aboutPage(path, response) {
    displayFile(path, response);
}

function contactPage(path, response) {
    displayFile(path, response);
}

function subscribePage(path, response) {
    displayFile(path, response);
}

function departPage(path, response) {
    displayFile(path, response);
}

function fourOfourPage(path, response) {
    displayFile(path, response);
}

function displayFile(path, response) {
    fs.readFile(path, function(err, data) {
        if(err) {
            console.log(err);
            response.end();
        } else {
            //console.log('file was served.')
            response.writeHead(response.statusCode, {'Content-Type': 'text/html'});
            response.write(data);
            response.end();
        };   
    });
};

module.exports = {
    indexPage,
    aboutPage,
    contactPage,
    subscribePage,
    departPage,
    fourOfourPage,
}