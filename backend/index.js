const connectToMongo = require("./db");
const express = require('express')
const cors = require('cors')
// const http = require('http')

const app = express();
// const server = http.createServer(app);
connectToMongo();
app.use(express.json());
app.use(cors())

// Available Routes
app.use("/api/auth", require('./routes/auth'));
app.use("/api/notes", require('./routes/notes'));


// app.listen(prompt)
app.get("/", (req, resp) => {
    resp.send("app is working")
});

// server.listen(5000)
app.listen(5000)