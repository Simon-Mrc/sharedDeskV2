import Database from "better-sqlite3";

export function up(db : InstanceType<typeof Database>) : void{
    db.pragma('foreign_keys = OFF');
    db.exec(`
        CREATE TABLE IF NOT EXISTS newItemTable(
            id                    TEXT PRIMARY KEY,
            deskId                TEXT NOT NULL,
            name                  TEXT NOT NULL,
            type                  TEXT NOT NULL CHECK(type IN ('file','folder','note')),
            x                     INTEGER ,
            y                     INTEGER ,
            accessPassword        TEXT DEFAULT NULL ,
            createdBy             TEXT,
            parentId              TEXT,
            FOREIGN KEY (deskId) REFERENCES desks(id)
            ON DELETE CASCADE,
            FOREIGN KEY (parentId) REFERENCES items(id)
            ON DELETE CASCADE,
            FOREIGN KEY (createdBy) REFERENCES users(id)
            ON DELETE SET NULL
            );
        `);
    db.exec(`
        INSERT INTO newItemTable (id,deskId,name,type,x,y,accessPassword,createdBy,parentId)
        SELECT id,deskId,name,type,x,y,accessPassword,createdBy,parentId FROM items
        `)
    db.exec(`
        DROP TABLE IF EXISTS items
        `)
    db.exec(`
        ALTER TABLE newItemTable RENAME TO items
        `)
    db.pragma('foreign_keys = ON')
}

export function down(db : InstanceType <typeof  Database>) : void{
    db.exec(`
        ALTER TABLE items ADD COLUMN creatorColor
        `)
}