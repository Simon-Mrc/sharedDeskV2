import type Database from 'better-sqlite3';

export function up(db: InstanceType<typeof Database>): void {
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
    
        CREATE TABLE IF NOT EXISTS itemUpdates(
        itemId          TEXT NOT NULL,
        userId          TEXT NOT NULL,
        lastModified    NUMBER NOT NULL,
        lastViewed       NUMBER NOT NULL DEFAULT 0,
        PRIMARY KEY (itemId,userId),
        FOREIGN KEY (userId) REFERENCES users(id)
        ON DELETE CASCADE,
        FOREIGN KEY (itemId) REFERENCES items(id)
        ON DELETE CASCADE
        );
    `)}

    export function down(db : InstanceType <typeof Database>) : void{
        db.exec(`
            DROP TABLE IF EXISTS itemUpdates;
            DROP TABLE IF EXISTS items;
            DROP TABLE IF EXISTS deskAccess;
            DROP TABLE IF EXISTS desks;
            DROP TABLE IF EXISTS users;
            `)
    }