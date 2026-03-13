const BASE_URL = 'http://localhost:3000'
import type { Note } from "../../shared/types"
import { authHeaders } from "./user"
import type { Item } from "../../shared/types"

////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// NOTES API CALLS ////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////GET NOTE BY ID /////////////////////////////////////////
export async function getNoteById(itemId: string): Promise<Note | null > {
    try {
        const result = await fetch(`${BASE_URL}/notes/${itemId}`, {
            method: 'GET',
            headers: authHeaders()
        })
        const note = await result.json() as Note | null;
        return note;
    } catch (error) {
        console.log('failed to get note');
        return null
    }
}

////////////////////////////////////////CREATE NOTE /////////////////////////////////////////
export async function createNote(item: Omit<Item, 'id'>, content: string): Promise<Note | null> {
    try {
        const result = await fetch(`${BASE_URL}/notes`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ itemB: item, content })
        })
        const newNote = await result.json() as Note | null;
        return newNote;
    } catch (error) {
        console.log('failed to create note');
        return null
    }
}

////////////////////////////////////////UPDATE NOTE CONTENT /////////////////////////////////////////
export async function updateNoteContent(itemId: string, content: string): Promise<{ content: string } | null > {
    try {
        const result = await fetch(`${BASE_URL}/notes/${itemId}`, {
            method: 'PUT', 
            headers: authHeaders(),
            body: JSON.stringify({ content })
        })
        const updated = await result.json() as { content: string } | null;
        return updated;
    } catch (error) {
        console.log('failed to update note');
        return null
    }
}