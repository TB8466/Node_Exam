import path from "path"
import http from "http";
import express from "express";
const app = express();
const server = http.createServer(app);

app.use(express.static(path.resolve('../client/public')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve('../client/public/index.html'));
  });
  

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server is running on:",PORT));