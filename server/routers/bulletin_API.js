import { Router } from "express";
import db from "../database/createMySQLConnection.js"

const router = Router();

router.get("/api/bulletin", (req, res) => {
    db.query("SELECT * FROM bulletin", (error, result) =>{
        if (error) throw error;
        res.send(result);
    });
});

router.put("/api/bulletin", (req, res) => {
    const VALUES = [
        [req.body.head || "Headline N/A"],[req.body.msg || "Nothing on the agenda today"],[req.body.bdg || 0]
    ];
    db.query("UPDATE bulletin SET headline = ?, message = ?, budget = ? WHERE id = 1",VALUES, (error,result) => {
      if (error) throw error;
      res.send({ Result : result })
    });
});

export default router;