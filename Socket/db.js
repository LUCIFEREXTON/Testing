const mongoose = require('mongoose');

const connect = mongoose.connect("mongodb://127.0.0.1:27017/chatapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("error", console.error.bind(console, "Mongodb error"));
mongoose.connection.on("connected", () => { console.log("Database connected") });

// const msgSchema = new mongoose.Schema({
//     to: mongoose.ObjectId,
//     from: mongoose.ObjectId,
//     msg: String
// })

const userSchema = new mongoose.Schema({
    name: String,
    passcode: String,
    // messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Msg' }]
})

// exports.Msg = mongoose.model("Msg", msgSchema);
exports.User = mongoose.model("User", userSchema);