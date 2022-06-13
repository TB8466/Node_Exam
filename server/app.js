import express from "express";
import path from "path"
import userAPI from "./routers/user.js"
import cors from "cors";
import http from "http";
//import dotenv from "dotenv"

const app = express();
app.use(cors());
const server = http.createServer(app);
//dotenv.config();

app.use(userAPI);
app.use(express.static(path.resolve('../client/public')));


app.get('*', (req, res) => {
    res.sendFile(path.resolve('../client/public/index.html'));
  });

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server is running on:",PORT));