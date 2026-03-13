import type Database from 'better-sqlite3';

export function up(db: InstanceType<typeof Database>): void {
    db.pragma('foreign_keys = OFF');
    db.exec(` 
        CREATE TABLE IF NOT EXISTS newitemstable(
            id                    TEXT PRIMARY KEY,
            deskId                TEXT NOT NULL,
            name                  TEXT NOT NULL,
            type                  TEXT NOT NULL CHECK(type IN ('file','folder','note')),
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
            `);
            db.prepare(`
                INSERT INTO newitemstable 
                SELECT * FROM items
                `).run();
                
            db.exec(`
                DROP TABLE IF EXISTS items
            `);
            db.exec(`ALTER TABLE newitemstable RENAME TO items`);
            db.exec(` 
                CREATE TABLE IF NOT EXISTS notes(
                itemId                TEXT PRIMARY KEY,
                content               TEXT DEFAULT NULL,
                FOREIGN KEY (itemId) REFERENCES items(id)
                ON DELETE CASCADE
                );
            `);                
        db.pragma('foreign_keys = ON');
    }
                
export function down(db : InstanceType <typeof Database>) : void{
    db.exec(`
        DROP TABLE IF EXISTS notes
        `)
        }