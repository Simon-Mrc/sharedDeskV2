import Database from 'better-sqlite3';
import { up as up001} from './migrations/001_initial_schema';
import { up as up002 } from './migrations/002_add_note_table_schema';

interface Migration {
    name : string;
    up : (db : InstanceType<typeof Database>)=> void
}

const allMigration : Migration[] = [
    {name : '001_initial_schema', up : up001},
    {name : '002_add_note_table_schema', up : up002}
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