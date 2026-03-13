import Database from 'better-sqlite3';
import path from 'path';
import dotenv from 'dotenv';
import { runMigration } from './runMigrations';

dotenv.config();

const DB_PATH = path.join(__dirname, 'database.db');

const db = new Database(DB_PATH);
db.pragma('foreign_keys = ON');

runMigration(db);


export default db;