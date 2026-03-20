https://www.youtube.com/watch?v=YOP1Sev2xNY&t=89s // really not perfect needs to be rework and need to add a french presentation but i like the fact that this one is really true and spontaneous

> [!NOTE]
> Keep in mind that this is a **learning project** — not designed to be professional right away!
> My main focus though is to do this **the right way** in order to learn the good practices and industry ways of doing!

---

## 🚀 Upcoming Features
### 🌐 Global List

- [ ] Unable to drag directly on section for file upload
- [ ] Show prompt and think about better UX for upload and download
- [ ] Download several icons and ask for possible extension when uploading *(ppt, js, css, ts, word ... — will handle manually)*
- [ ] Finish all account settings
- [ ] Really need to think about duplicate option *(maybe just for files to avoid recursion and too much data storage?)*
- [ ] Rethink global structure around UX
- [ ] Polish everything

---

### 🔴 Absolute Must Do

- [ ] Add mail system — now that several migrations are done, shouldn't be too hard
- [ ] Create a tutorial for new users — **this is a must** because it's not that intuitive

---

### 💡 Nice to Have *(but not quite sure)*

- [ ] Add possibility for users to customize the entire interface *(colors mostly)*
- [ ] Add userName with associated color on sharedDesk
- [ ] Add userName on top of userColor as a little stamp on file creation for download

---
> ## ⚠️ `////!!!//// WARNING ////!!!//// AI GENERATED SUMMARY ////!!!////*
>   ### *`////!!!//// IT STARTS HERE !!! ////!!!////`*
---
# 🖥️ SharedDesk

A collaborative virtual desktop application where users can create shared workspaces ("desks"), place files, notes and folders on them, and collaborate in real time with access control and notifications.
Mostly think for friends and family to who just want to share pictures and stuff in a nice UI with nice UX. can be usefull for small team work and student group projects.

---

## 🚀 Features

- 📁 **Virtual Desks** — Create and manage workspaces with drag-and-drop item placement
- 📝 **Collaborative Notes** — Multi-user notes with auto-save, history, and per-user color attribution
- 📂 **File Upload / Download** — Attach files to items, store them on disk, download with one double-click
- 🔒 **Password Protection** — Lock any item (file, note, folder) behind a password
- 👥 **Access Control** — Invite users to desks, manage access types (admin / read)
- ✨ **New Item Notifications** — Visual indicators when items have been modified since your last visit
- 🎨 **User Color** — Each user gets a color that follows their created items
- 🗂️ **Folders & Sections** — Navigate through nested folders with animated transitions

---

## 🛠️ Tech Stack

### Frontend
| Tool | Usage |
|------|-------|
| React + TypeScript | UI framework |
| Vite | Dev server & bundler |
| CSS modules (custom) | Styling — no UI library |
| Fetch API | HTTP calls |

### Backend
| Tool | Usage |
|------|-------|
| Node.js + Express | REST API server |
| TypeScript | Type safety |
| better-sqlite3 | Embedded SQLite database |
| Multer | File upload handling (memory storage) |
| bcrypt | Password hashing |
| jsonwebtoken | Auth via JWT |

---

## 📁 Project Structure Overview (not all of it : tried to ls all and ask chatgpt to comput the organisation but he struggled it seems)

```
v2-sharedDesk/
├── shared/
│   └── types/              # Shared TypeScript types (Item, Desk, User...)
├── backend/
│   ├── src/
│   │   ├── controllers/    # Route logic (desk, item, note, file, user...)
│   │   ├── routes/         # Express routers
│   │   ├── middleware/      # Auth (JWT) + validation stubs
│   │   ├── services/       # fileService (save/delete files on disk)
│   │   ├── db/             # better-sqlite3 database setup
│   │   └── index.ts        # Entry point
│   └── uploads/            # Stored files (per desk subfolder)
└── src/                    # Frontend
    ├── api/                # Fetch API calls (user, desk, item, note, file...)
    ├── components/
    │   ├── item/           # PlaceFile, PlaceFolder, PlaceNote
    │   └── prompts/        # CreateItemPrompt, OptionMenu, AccessPrompt, DropArea
    ├── context/            # DeskContext, UserContext, SectionContext
    └── assets/css/         # All CSS files (modular, no UI library)
```

---

## ⚙️ Setup

### Prerequisites
- Node.js 18+
- npm

### Install

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend && npm install
```

### Environment

Create `backend/.env` :
```env
JWT_SECRET= ******
PORT=3000
```

### Run

```bash
# Start backend
cd backend && npm run dev

# Start frontend (separate terminal)
npm run dev
```

Frontend runs on `http://localhost:5173`  
Backend runs on `http://localhost:3000`

---

## 🔑 Auth

All protected routes require a `Bearer` token in the `Authorization` header.  
Token is obtained via `POST /users/login` and stored in `localStorage`.

---

## 📡 API  NOTABLE ONES Overview (7tables for now with 30 more or so custom routes including CRUD for most important ones)

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/users/login` | Login, returns JWT |
| POST | `/users` | Register |
| GET | `/desks/user` | Get all desks for current user |
| POST | `/desks` | Create a desk |
| GET | `/items/desks/:deskId` | Get all items for a desk |
| POST | `/items` | Create an item |
| POST | `/notes` | Create a note |
| GET | `/notes/:itemId` | Get note content |
| POST | `/files/upload` | Upload a file (multipart/form-data) |
| GET | `/files/download/:id` | Download a file |
| PATCH | `/files/:id` | Attach a file to existing item |
| DELETE | `/files/:id` | Delete a file and its item |
| POST | `/deskAccess/:deskId` | Invite a user to a desk |

---

**Why no UI library?**  
100% custom CSS.Good learning exercise and full visual control.

**File storage on disk for now**  

**DB Transactions**

---

## 🚧 Known Limitations / TODO

- [ ] Zod validation on all routes 
- [ ] WebSockets for real-time chaet
- [ ] File type restrictions and size limits on upload
- [ ] Proper error messages on the frontend
- [ ] Tests

---
