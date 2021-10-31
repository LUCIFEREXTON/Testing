require("./db.js");
const express = require("express");
const { createServer } = require("http");
const cors = require('cors')
const app = express();
const server = createServer(app);
module.exports = io = require("socket.io")(server, { cors: { origin: '*' } });
const { connection, setid } = require('./socketFunction')
const { login, getuser } = require('./routesController')

/********************MIDDLEWARE***************************************/
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}))

/********************IO CODE***************************************/

io.use(setid)

io.on('connection', connection)


/********************GET/POST/DELETE APP CODE***************************************/

app.post("/login", login)
app.get("/user/:id", getuser)

server.listen(3001);