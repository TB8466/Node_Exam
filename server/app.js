import express from "express";
import path from "path";
import userAPI from "./routers/user_API.js";
import catalogAPI from "./routers/catalog_API.js";
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
  const cart = {
    itemId : "",
    amount : 0
  }
  const wares = [];
  socket.on("cartUpdated", ({ id, amount }) => {
    if(wares[0].itemId === id){
      console.log("if activated");
      wares.findIndex(id).amount + 1;
    }
    else{
    cart.itemId = id;
    cart.amount = amount;
    wares.push(cart);
    }
    console.log(wares);
    console.log(wares[0].itemId);
    io.emit("updateCart", { wares : wares });
  });


});

app.use(userAPI);
app.use(catalogAPI);

app.get('*', (req, res) => {
    res.sendFile(path.resolve('../client/public/index.html'));
  });




const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server is running on:",PORT));