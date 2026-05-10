const http = require('http');
require('dotenv').config();
const app = require('./app/app');

const server = http.createServer(app);

server.listen(process.env.PORT, () => {
	console.log(`Server running at http://localhost:${process.env.PORT}/`);
});
