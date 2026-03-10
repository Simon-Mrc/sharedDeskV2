export interface User {
    name : string;
    userName : string;
    id : string;
    accountType : 'admin' | 'user' | 'premium';
    mail : string;
    password : string;
    friendList : string[];
    notif : string[];
    userColor : string;
}

export interface UserContextType {
    user : Omit<User , 'password'>|null;
    logged : boolean;
    login : (mail : User['mail'] , password : string)=> void;
    logout : ()=>void;
}

export interface Desk {
    id : string;
    name : string ; 
    ownerId : User['id'];
    urlLink : string | null;
    accessPassword : string|null;
    createdAt : string;
}

export interface DeskAccess {
    deskId : Desk['id'];
    userId : User['id'];
    accessType : 'read' | 'modify' | 'admin';
}

export interface DeskContextType {
    currentDesk : Desk | null;
    desks : Desk[]|null;
    items : Item[]|null;
    loaded : boolean;
    switchDesk : (deskId : Desk['id'])=>void;
    refreshDesks : ()=>void;
    createItemDesk : (item : Omit<Item,'id'>) => void;
}

export interface Item {
    id : string;
    deskId : string;
    name : string;
    type : 'file' | 'folder' | 'note' ; // note is for later purpose when we ll add 'send message feature not taken care of right now !
    x : number;
    y : number;
    accessPassword? : string|null;
    createdBy : User['id'];
    creatorColor : User['userColor'];
    parentId : null | Item['id'];
}

export interface SectionContextType { //to tell react what dom to display 
    currentSection : null | Item['id'];
    depth : number;
    updateDepth : (number : number)=>void;
    sectionExist : boolean;
    switchSection : (sectionId : string|null)=>void;
}

export interface CreateUserPayload {
    name : string;
    userName : string;
    mail : string;
    password : string;
}

export interface CreateItemPayload {
    deskId : string;
    name : string;
    type : 'file' | 'folder' | 'note' ; // note is for later purpose when we ll add 'send message feature not taken care of right now !
    x : number;
    y : number;
    createdBy : User['id'];
    parentId : null | Item['id'];
}

export interface CreateDeskPayload {
    name : string ; 
    ownerId : User['id'];
}

export interface LoginPayload {
    mail : User['mail'];
    password : string;
}

export interface JwtPayload {
    userId: string;
    userName: string;
    accountType: 'admin' | 'user' | 'premium';
}