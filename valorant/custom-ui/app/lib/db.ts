import path from "path";
import sqlite3 from "sqlite3";

const dbPath = path.join(process.cwd(), "./public/shotsfired.db");

export const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the shotsfired database.");
});

export const apiGet = async <T = unknown>(query: string): Promise<T[]> => {
  return await new Promise((resolve, reject) => {
    db.all<T>(query, (err: Error, data) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(data);
    });
  });
};

export const apiPost = async (query: string, values: string[]) => {
  return await new Promise((resolve, reject) => {
    db.run(query, values, function (err) {
      if (err) {
        console.log(err);
        return reject(err);
      }
      return resolve(null);
    });
  });
};
