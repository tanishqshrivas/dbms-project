import express from "express";
import { db } from "../db.js";
const router = express.Router();

// CREATE owner
router.post("/", async (req, res) => {
  const { owner_name, address, phone } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO Owners (owner_name, address, phone) VALUES (?, ?, ?)",
      [owner_name, address, phone]
    );
    res.json({ id: result.insertId, message: "Owner added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all owners
router.get("/", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM Owners");
  res.json(rows);
});

// UPDATE owner
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { owner_name, address, phone } = req.body;
  await db.query(
    "UPDATE Owners SET owner_name=?, address=?, phone=? WHERE owner_id=?",
    [owner_name, address, phone, id]
  );
  res.json({ message: "Owner updated successfully" });
});

// DELETE owner
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM Owners WHERE owner_id=?", [id]);
  res.json({ message: "Owner deleted successfully" });
});

export default router;
