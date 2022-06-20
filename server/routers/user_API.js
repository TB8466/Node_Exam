import { Router } from "express";
import db from "../database/createMySQLConnection.js";
import passwordHandler from "../security/passwordHandler.js"

const router = Router();

router.get("/api/user", (req, res) => {
    res.send({ data: req.session.username });
});
/* router.get("/api/user", (req, res) => {

    db.query("SELECT * FROM users", (error, result) =>{
        if (error) throw error;
        res.send(result);
    });
}); */

router.post("/api/user", async (req, res) => {
    const VALUES = [
        [req.body.newEmail || "Email N/A"],
        [req.body.newUsername || "Username N/A"],
        [await passwordHandler.encrypt(req.body.newPassword) || "Password N/A"]
    ];
    db.query("INSERT INTO users (email,username,password) VALUES (?,?,?)",
    VALUES,
    (error,result) =>{
        if (error) throw error;
        res.send({ Result : result })
    });
  });

router.post("/api/user/login", async (req, res) => {
    db.query("SELECT EXISTS (SELECT password FROM users WHERE username=?) AS res",
    req.body.username,
    (error, result) =>{
        if(result[0].res){
            db.query("SELECT password FROM users WHERE username=?",
            req.body.username,
            async (error, result) =>{
                if(error)throw error;
                if(await passwordHandler.decrypt(req.body.password,String(result[0].password))){
                    req.session.username = req.body.username;
                    console.log("From post",req.session.username);
                    res.send(true);
                }
                else{
                    res.send(false);
                }  
            });
        }
        else{
            res.send(false);
        }
    }); 
});

router.get("/profile", (req,res) =>{
    console.log(req.session);
    console.log("Username:",req.session.username);
    if (req.session.username){
        res.send({msg : "Welcome"});
    }
    else{
        res.send({msg: "Go away"})
    }
});


export default router;