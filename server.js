const express = require("express");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Connect to database
const db = new sqlite3.Database("./university.db", (err) => {
  if (err) {
    return console.error("Database connection error:", err.message);
  }
  console.log("Connected to university.db database.");
});


// GET ALL COURSES

app.get("/api/courses", (req, res) => {
  db.all("SELECT * FROM courses", (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});


// GET COURSE BY ID 

app.get("/api/courses/:id", (req, res) => {
  const id = req.params.id;

  db.get("SELECT * FROM courses WHERE course_code = ?", [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(row);
  });
});


// INSERT NEW COURSE

app.post("/api/courses", (req, res) => {
  const { course_code, title, credits, description, semester } = req.body;

  db.run(
    `INSERT INTO courses (course_code, title, credits, description, semester)
     VALUES (?, ?, ?, ?, ?)`,
    [course_code, title, credits, description, semester],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Course created successfully" });
    }
  );
});


// UPDATE COURSE

app.put("/api/courses/:id", (req, res) => {
  const id = req.params.id;
  const { title, credits, description, semester } = req.body;

  db.run(
    `UPDATE courses 
     SET title = ?, credits = ?, description = ?, semester = ?
     WHERE course_code = ?`,
    [title, credits, description, semester, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Course updated successfully" });
    }
  );
});


// DELETE COURSE

app.delete("/api/courses/:id", (req, res) => {
  const id = req.params.id;

  db.run("DELETE FROM courses WHERE course_code = ?", [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "Course deleted successfully" });
  });
});


// Start Server

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});