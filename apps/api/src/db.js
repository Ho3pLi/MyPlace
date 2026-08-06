import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";
import config from "./config.js";

const dataDir = path.dirname(config.databasePath);
fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(config.databasePath);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT DEFAULT "",
    banner TEXT DEFAULT "",
    bannerAlt TEXT DEFAULT "",
    github TEXT DEFAULT "",
    content TEXT DEFAULT "",
    readTime INTEGER DEFAULT 3,
    publishedAt TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'draft',
    views INTEGER DEFAULT 0,
    tags TEXT DEFAULT "[]",
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  )
`);

export default db;
