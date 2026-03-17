import Database from 'better-sqlite3';
import { up as up001} from './migrations/001_initial_schema';
import { up as up002 } from './migrations/002_add_note_table_schema';
import { up as up003 } from './migrations/003_removeCreatorColor_schema';
import { up as up004 } from './migrations/004_add_column_item_schema';
import { up as up005 } from './migrations/005_add_column_users_avatarFilePath_schema';
import { up as up006 } from './migrations/006_add_column_users_avatarFilePath_schema';
import { up as up007 } from './migrations/007_add_unique_mail_users_schema';

interface Migration {
    name : string;
    up : (db : InstanceType<typeof Database>)=> void
}

const allMigration : Migration[] = [
    {name : '001_initial_schema', up : up001},
    {name : '002_add_note_table_schema', up : up002},
    {name : '003_removeCreatorColor_schema', up : up003},
    {name : '004_add_column_item_schema' , up : up004},
    {name : '005_add_column_users_avatarFilePath_schema' , up : up005},
    {name : '006_add_column_users_avatarFilePath_schema' , up : up006},
    {name : '007_add_unique_mail_users_schema', up : up007}
];

export function runMigration(db : InstanceType<typeof Database>){
    db.exec(`
        CREATE TABLE IF NOT EXISTS _migrations(
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        name        TEXT NOT NULL,
        ranAt       TEXT NOT NULL
        )
        `)

        const appliedMigrations = db.prepare(`
            SELECT name FROM _migrations
            `).all() as {name : string}[];
            
        const appliedMigrationsNames = appliedMigrations.map((migration)=>migration.name);

        allMigration.forEach(migration => {
            if(!appliedMigrationsNames.includes(migration.name)){migration.up(db)
                db.prepare(`
                    INSERT INTO _migrations (name, ranAt)
                    VALUES (?,?)
                    `).run(migration.name,new Date().toISOString());
                    console.log(`✅ Migration applied: ${migration.name}`)            
            }
        });
}