import { Router } from "express";
import db from "../database/createMySQLConnection.js"

const router = Router();

router.get("/api/catalog", (req, res) => {
    db.query("SELECT * FROM catalog", (error, result) =>{
        if (error) throw error;
        res.send(result);
    });
});

router.post("/api/catalog", (req, res) => {
    console.log(req.body)
    const VALUES = [
      [req.body.name || "Name N/A"],[req.body.description || ""],[req.body.amount || 0]
    ];
    db.query("INSERT INTO catalog (name,description,amount) VALUES (?,?,?)", VALUES, (error,result) =>{
        if (error) throw error;
        res.send({ Result : result })
    });
  });

export default router;