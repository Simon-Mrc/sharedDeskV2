> ## ⚠️ `////!!!//// WARNING ////!!!//// AI GENERATED SUMMARY ////!!!//// NOT THAT ACCURATE ////!!!!////`
> ### *`////!!!//// LAZY ASS ME STILL TAKING IT ////!!!////`*
>
> So globally it's an accurate resume but structure isn't exactly as described.
> Backend is way more than 2 tables — Full CRUD for all 4 tables + some other routes designed for specific needs.
>
> Most inaccurate thing is roadmap :
> | # | What |
> |---|------|
> | #1 | Is gonna be some basic social features |
> | #2 | Is gonna be all functions for options set up |
> | #3 | Is gonna make this an all functionnal app with draggable / all social enable |
> | #4 | Rework back end to add validations and some other middleware i have to think about |
> | #5 | Is gonna be rework on app globally (css + functions + backend) so it all works flawlessly |
> | #6 | Is gonna be the big big work : Adding a mailbox system that ll require a new table to be designed so i ll learn about how to face migration and massive db changes issues on a fully functionnal app |
> | #7 | Stop lazyass commit only on main branch and do separate branch for new features even if i am working on my own |
>
> Keep in mind that this is a **learning project** — not designed to be professional right away!
> My main focus tho is to do this **the right way** in order to learn the good practice and industry ways of doing!

---
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
