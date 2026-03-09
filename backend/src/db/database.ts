import Database from 'better-sqlite3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const DB_PATH = path.join(__dirname, 'database.db');

const db = new Database(DB_PATH);
db.pragma('foreign_keys = ON');

db.exec(`
    CREATE TABLE IF NOT EXISTS users(
    id              TEXT NOT NULL PRIMARY KEY,
    name            TEXT NOT NULL,
    userName        TEXT NOT NULL UNIQUE,
    mail            TEXT NOT NULL,
    accountType     TEXT CHECK(accountType IN('admin' ,'user','premium')) DEFAULT 'user',
    friendList      TEXT DEFAULT '[]',
    notif           TEXT DEFAULT '[]',
    userColor       TEXT DEFAULT '#FF5733',
    password        TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS desks(
    id              TEXT NOT NULL PRIMARY KEY,
    name            TEXT NOT NULL,
    ownerId         TEXT ,
    urlLink         TEXT DEFAULT NULL,
    accessPassword  TEXT DEFAULT NULL,
    createdAt       TEXT,    
    FOREIGN KEY (ownerId) REFERENCES users(id)
    ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS deskAccess(
    deskId          TEXT NOT NULL,
    userId          TEXT,
    accessType      TEXT CHECK(accessType IN('read' , 'modify' , 'admin')) DEFAULT 'read',
    PRIMARY KEY (deskId,userId),
    FOREIGN KEY (deskId) REFERENCES desks(id)
    ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id)
    ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS items(
    id                    TEXT PRIMARY KEY,
    deskId                TEXT NOT NULL,
    name                  TEXT NOT NULL,
    type                  TEXT NOT NULL CHECK(type IN ('file','folder')),
    x                     INTEGER ,
    y                     INTEGER ,
    accessPassword        TEXT DEFAULT NULL ,
    createdBy             TEXT,
    creatorColor          TEXT,
    parentId              TEXT,
    FOREIGN KEY (deskId) REFERENCES desks(id)
    ON DELETE CASCADE,
    FOREIGN KEY (parentId) REFERENCES items(id)
    ON DELETE CASCADE,
    FOREIGN KEY (createdBy) REFERENCES users(id)
    ON DELETE SET NULL 
    );
`)



export default db;