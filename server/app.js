import express from "express";
import path from "path";
import userAPI from "./routers/user_API.js";
import catalogAPI from "./routers/catalog_API.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import session from "express-session";

const app = express();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
});

app.use(cors());
app.use(express.json());



app.use(sessionMiddleware);
app.use(express.static(path.resolve('../client/public')));
app.use(userAPI);
app.use(catalogAPI);

const server = http.createServer(app);

const io = new Server(server);
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

io.on("connection", (socket) => {

  socket.on("testThis", ({ data }) => {
    console.log("app socket ON");
    io.emit("thisTest", { data });
  });
});

io.on("connection", (socket) => {
  socket.on("loggedIn", ({ data }) => {
    
    const username = socket.request.session.username;
    console.log("The session username is:",username);
    io.emit("login", { username });
  });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve('../client/public/index.html'));
  });



const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server is running on:",PORT));