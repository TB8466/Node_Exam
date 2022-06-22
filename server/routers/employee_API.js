import { Router } from "express";
import db from "../database/createMySQLConnection.js"

const router = Router();

router.get("/api/employee", (req, res) => {
    db.query("SELECT * FROM employees", (error, result) =>{
        if (error) throw error;
        res.send(result);
    });
});

router.get("/api/employee/:id", (req, res) => {
  db.query("SELECT * FROM employees WHERE id = ?",[req.params.id], (error, result) =>{
      if (error) throw error;
      res.send(result);
  });
});

router.post("/api/employee", (req, res) => {
    const VALUES = [
      [req.body.name || "Name N/A"],[req.body.age || 0],[req.body.position || "Name N/A"],[req.body.wage || 0],[req.body.email || "EMAIL N/A"]
    ];
    db.query("INSERT INTO employees (name,age,position,wage,email) VALUES (?,?,?,?,?)", VALUES, (error,result) =>{
        if (error) throw error;
        res.send({ Result : result })
    });
  });

router.put("/api/employee/:id", (req,res) => {
  db.query("UPDATE employees SET isCheckedIn = ? WHERE id = ?",[[req.body.isCheckedIn],[req.params.id]], (error,result) => {
    if (error) throw error;
    res.send({ Result : result })
  });
});

router.put("/api/employee", (req, res) => {
  const VALUES = [
    [req.body.name || "Name N/A"],[req.body.age || 0],[req.body.position || "Name N/A"],[req.body.wage || 0],[req.body.email || "EMAIL N/A"],[req.body.id]
  ];
  db.query("UPDATE employees SET name = ?, age = ?, position = ?, wage = ?, email = ? WHERE id = ?",VALUES, (error,result) => {
    if (error) throw error;
    res.send({ Result : result })
  });
});

router.delete("/api/employee", (req, res) => {
  db.query("DELETE FROM employees WHERE id = ?",[req.body.id], (error, result) =>{
      if (error) throw error;
      res.send(result);
  });
});

export default router;