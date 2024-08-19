import { db } from "~/lib/db";

function migrateRoster() {
  db.serialize(() => {
    db.run(
      `
      CREATE TABLE IF NOT EXISTS roster(
      rosterIndex INTEGER PRIMARY KEY AUTOINCREMENT,
      agent TEXT NULL
      )
    `,
      (err: Error) => {
        if (err) {
          console.error(err.message);
        }
        console.log("roster table created successfully.");
      }
    );
  });
}

migrateRoster();
