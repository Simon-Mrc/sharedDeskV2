import Database from "better-sqlite3";

export function up(db : InstanceType<typeof Database>) : void{
    db.pragma('foreign_keys = OFF');
    const myTransaction = db.transaction(()=>{
        db.exec(`
        CREATE TABLE IF NOT EXISTS newUser(
            id              TEXT NOT NULL PRIMARY KEY,
            name            TEXT NOT NULL,
            userName        TEXT NOT NULL UNIQUE,
            mail            TEXT NOT NULL UNIQUE ,
            accountType     TEXT CHECK(accountType IN('admin' ,'user','premium')) DEFAULT 'user',
            friendList      TEXT DEFAULT '[]',
            notif           TEXT DEFAULT '[]',
            userColor       TEXT DEFAULT '#FF5733',
            password        TEXT NOT NULL,
            avatarFilePath  TEXT DEFAULT NULL
        )
        `);
        db.exec(`
        INSERT INTO newUser
        SELECT * FROM users
        `);
        db.exec(`
        DROP TABLE IF EXISTS users    
        `);
        db.exec(`
        ALTER TABLE newUser RENAME TO users    
        `);
    });
    myTransaction();
    db.pragma('foreign_keys = ON');
}