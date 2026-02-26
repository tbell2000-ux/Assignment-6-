const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./university.db", (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to university.db database.");
});

db.run(`
  CREATE TABLE courses (
    course_code TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    credits INTEGER NOT NULL,
    description TEXT NOT NULL,
    semester TEXT NOT NULL
  )
`, (err) => {
  if (err) {
    return console.error("Error creating table:", err.message);
  }
  console.log("Courses table created successfully.");
  db.close();
});