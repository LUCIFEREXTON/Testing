const express = require("express");
const { createServer } = require("http");
const cors = require('cors')
const app = express();
const server = createServer(app);
const io = require("socket.io")(server, { cors: { origin: '*' } });

app.use(express.static(__dirname + "/public/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
io.use((socket, next) => {
    socket.id = socket.handshake.query.id;
    next(null, true)
})
const users = [{
        id: "1001",
        name: "John Doe",
        passcode: "1234"
    },
    {
        id: "1002",
        name: "Bill gary",
        passcode: "4321"
    },
    {
        id: "1003",
        name: "Derry",
        passcode: "3456"
    },
    {
        id: "1004",
        name: "Sachin",
        passcode: "6543"
    },
]
io.on('connection', function(socket) {
    console.log(`${socket.id} is connected`);
    socket.user = users.find(user => socket.id === user.id);
    socket.on("disconnecting", async() => {
        io.fetchSockets().then(sockets => {
            const users = sockets.map(socket => socket.user).filter(user => user.id !== socket.id);
            io.emit("allusers", users);
        }).catch(console.log)
    });
    socket.on("disconnect", () => {
        console.log(`${socket.id} is disconnected`);
    })
    sendusers();
})

const sendusers = () => {
    io.fetchSockets().then(sockets => {
        const users = sockets.map(socket => socket.user);
        io.emit("allusers", users);
    }).catch(console.log)
}


app.post("/login", async(req, res) => {
    const user = users.find(user => (user.name.toLowerCase() === req.body.name.toLowerCase() && user.passcode === req.body.passcode));
    res.json({
        login: true,
        user
    })
})

server.listen(3001);