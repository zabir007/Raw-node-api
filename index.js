// start the API server
// create, edit, delete user
// token based authentication
// logout mechanism
// set links & up/down
// edit/delet links rate limit
// check up/down time
console.clear();
const http = require('http');
const {
    handleReqRes
} = require('./helper/handleReqRes')
const app = {}

app.config = {
    port: 3000
}

app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to port no ${app.config.port}`)
    });

}

app.handleReqRes = handleReqRes;

app.createServer();