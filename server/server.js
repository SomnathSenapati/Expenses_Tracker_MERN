const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 2809;

const server = http.createServer(app);

server.listen(PORT, console.log(`server is running on port ${PORT}`));
