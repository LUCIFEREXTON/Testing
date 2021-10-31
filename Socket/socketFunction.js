const io = require('./server.js');
const { User } = require("./db")


const sendusers = () => {
    io.fetchSockets().then(sockets => {
        const users = sockets.map(socket => socket.user);
        io.emit("allusers", users);
    }).catch(console.log)
}

exports.setid = (socket, next) => {
    socket.id = socket.handshake.query.id;
    next(null, true)
}

exports.connection = async(socket) => {
    console.log(`${socket.id} is connected`);

    socket.on('getusers', sendusers)

    // sendusers();

    const u = await User.findOne({ _id: socket.id });
    socket.user = {
        id: u._id,
        name: u.name
    }


    socket.on("disconnect", () => {
        sendusers();
        console.log(`${socket.id} is disconnected`);
    })


    socket.on("sendmsg", (toid, text, fromid, cb) => {
        console.log(`from ${fromid} -> to${toid}:${text}`)
        const recieved = io.to(toid).emit("recievedmsg", text, fromid)
        if (recieved) {
            cb({ status: true, text });
        }
    })
}