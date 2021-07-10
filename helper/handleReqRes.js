const {
    StringDecoder
} = require('string_decoder')
const url = require('url')
const routes = require('../route')
const {
    notFoundHandler
} = require('../handler/routeHandler/notFound')

const handler = {}

handler.handleReqRes = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObj = parsedUrl.query;
    const headerObj = req.headers;

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObj,
        headerObj,
    }

    const decoder = new StringDecoder('utf-8')
    let realData = '';

    const choosenHeader = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    choosenHeader(requestProperties, (statusCode, payload) => {
        statusCode = typeof (statusCode) === 'number' ? statusCode : 500
        payload = typeof (payload) === 'object' ? payload : {}

        const payloadString = JSON.stringify(payload)

        res.writeHead(statusCode);
        res.end(payloadString);
    })
    req.on('data', (buffer) => {
        realData += decoder.write(buffer)
    })

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        res.end('hello programmers!');
    })
}
module.exports = handler