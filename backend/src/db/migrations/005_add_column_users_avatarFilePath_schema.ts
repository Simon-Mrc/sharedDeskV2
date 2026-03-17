import Database from "better-sqlite3";

export function up(db : InstanceType<typeof Database> ): void{
    db.prepare(`
        ALTER TABLE users ADD COLUMN avatarFilePath TEXT DEFAULT NULL
        `)
}

export function down(db : InstanceType<typeof Database> ): void{
    db.prepare(`
        ALTER TABLE users DROP COLUMN avatarFilePath
        `)
}