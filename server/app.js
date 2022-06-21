import express from "express";
import path from "path";
import userAPI from "./routers/user_API.js";
import catalogAPI from "./routers/employee_API.js";
import emailAPI from "./routers/email_API.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import session from "express-session";


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
});

app.use(express.static(path.resolve('../client/public')));
app.use(sessionMiddleware);



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
  const shoppingList = [];
  socket.on("cartUpdated", ({ cart }) => {
    shoppingList.push(cart);
    session.shoppingList = shoppingList;
    console.log(session.shoppingList);

    io.emit("updateCart", { cart });
  });


});

app.use(userAPI);
app.use(catalogAPI);
app.use(emailAPI);

app.get('*', (req, res) => {
    res.sendFile(path.resolve('../client/public/index.html'));
  });




const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server is running on:",PORT));