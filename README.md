>#### UPCOMING FEATURES #####
>############## GLOBAL LIST NO PARTICULAR ORDER ##################
 /!\ Unable drag on directly on section for upload file
 /!\ Show prompt and think about better UX for upload and download
 /!\ Download several icons and ask for possible extension when upload (ppt, js, css, ts word .... i ll handle this manually i think)
 /!\ finish all account setting 
 /!\ Really need to think about duplicate option (maybe just for file to avoid recursion and too many data storage ?)
 /!\ Rethink global structure around UX 
 /!\ Poilish all 
 /!\ 

 ######################## ABSOLUTE MUST DO ##########################
 /!\ Add mail system now that i have done several migrations shouldn t be too hard
 /!\ Create a tutorial for new user : This is a must because it s not that intuitive

 ######################### NICE TO HAVE BUT NOT QUITE SURE ########################
 /!\ Add possibility for user to customize entire interface (color mostly)
 /!\ Add userName with associated color on sharedDesk ?
 /!\ Add userName on top of userColor as a little stamp on file creation for download ?
>
> Keep in mind that this is a **learning project** — not designed to be professional right away!
> My main focus tho is to do this **the right way** in order to learn the good practice and industry ways of doing!

---
> ## ⚠️ `////!!!//// WARNING ////!!!//// AI GENERATED SUMMARY ////!!!//// NOT THAT ACCURATE ////!!!!////`
> ### *`////!!!//// LAZY ASS ME STILL TAKING IT ////!!!////`*
>   ### *`////!!!//// IT STARTS HERE !!! ////!!!////`*
---
# 🖥️ SharedDesk V2

A browser-based desktop experience — organize your files and folders in a visual workspace, share desks with friends, and collaborate!

---

## ✨ Features

- 🗂️ **Visual Desktop** — place files and folders freely on your desk
- 📁 **Navigable Folders** — double click to enter, back button to exit
- 🖱️ **Context Menu** — right click on desk to create items, right click on items to rename, delete, or set a password
- 🎨 **User Colors** — each user has a color reflected on their created items
- 👥 **Social Features** *(in progress)* — add friends, share desks, manage access roles
- 🔐 **Auth** — secure password hashing with bcrypt

---

## 🛠️ Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React + TypeScript + Vite         |
| Backend    | Node.js + Express + TypeScript    |
| Database   | SQLite (better-sqlite3)           |
| Auth       | bcrypt                            |
| Dev tools  | Nodemon, ESLint                   |

---

## 📁 Project Structure

```
sharedDeskV2/
├── backend/          # Express API + SQLite DB
├── src/              # React frontend
│   ├── context/      # SectionContext, DeskContext, UserContext
│   └── components/   # DeskDisplay, PlaceFile, PlaceFolder, OptionMenu...
├── shared/           # Shared TypeScript types (frontend + backend)
├── public/           # Static assets (icons...)
├── index.html
├── vite.config.ts
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/Simon-Mrc/sharedDeskV2.git
cd sharedDeskV2

# Install dependencies
npm install
```

### Run in development

```bash
# Run frontend + backend together
npm run dev
```

> Frontend runs on `http://localhost:5173`
> Backend runs on `http://localhost:3000`

---

## 🗄️ Database Schema

```sql
-- Users
CREATE TABLE users (
    id          TEXT PRIMARY KEY,
    name        TEXT NOT NULL,
    userName    TEXT NOT NULL UNIQUE,
    mail        TEXT NOT NULL,
    accountType TEXT DEFAULT 'user',   -- 'admin' | 'user' | 'premium'
    friendList  TEXT DEFAULT '[]',
    notif       TEXT DEFAULT '[]',
    userColor   TEXT DEFAULT '#FF5733',
    password    TEXT NOT NULL
);

-- Items (files & folders)
CREATE TABLE items (
    id           TEXT PRIMARY KEY,
    name         TEXT NOT NULL,
    type         TEXT NOT NULL,        -- 'file' | 'folder'
    x            REAL NOT NULL,
    y            REAL NOT NULL,
    parentId     TEXT,                 -- null = root of desk
    deskId       TEXT NOT NULL,
    userId       TEXT NOT NULL,
    creatorColor TEXT DEFAULT '#FF5733',
    password     TEXT                  -- optional folder protection
);
```

---

## 🗺️ Roadmap

- [x] Visual desk with draggable items
- [x] Navigable folder system with animations
- [x] Right click context menu on items
- [ ] Rename / Delete / Password protect items
- [ ] Duplicate items (recursive with new ids)
- [ ] Friend system (add, invite to desk)
- [ ] Shared desks with role-based access (`viewer` | `editor`)

---

## 👤 Author

**Simon** — [@Simon-Mrc](https://github.com/Simon-Mrc)

---

*Project built from scratch as a learning project — React, TypeScript, Express, SQLite all in one! 🚀*
