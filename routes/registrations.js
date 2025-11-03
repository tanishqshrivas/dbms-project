import express from "express";
import { db } from "../db.js";
const router = express.Router();

// CREATE registration
router.post("/", async (req, res) => {
  const { vehicle_id, registration_date, expiry_date } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO Registrations (vehicle_id, registration_date, expiry_date) VALUES (?, ?, ?)",
      [vehicle_id, registration_date, expiry_date]
    );
    res.json({ id: result.insertId, message: "Registration added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ all registrations
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT r.*, v.registration_number, v.vehicle_type
      FROM Registrations r
      JOIN Vehicles v ON r.vehicle_id = v.vehicle_id
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE registration
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { vehicle_id, registration_date, expiry_date } = req.body;
  try {
    await db.query(
      "UPDATE Registrations SET vehicle_id=?, registration_date=?, expiry_date=? WHERE registration_id=?",
      [vehicle_id, registration_date, expiry_date, id]
    );
    res.json({ message: "Registration updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE registration
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM Registrations WHERE registration_id=?", [id]);
    res.json({ message: "Registration deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
