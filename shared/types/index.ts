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
    avatarFilePath ?: string|null;
}

export interface UserContextType {
    user : Omit<User , 'password'>|null;
    logged : boolean;
    login : (mail : User['mail'] , password : string)=> void;
    logout : ()=>void;
    setNewUser : (user  : Omit<User,'password'>) => void;
}

export interface Desk {
    id : string;
    name : string ; 
    ownerId : User['id'];
    urlLink : string | null;
    accessPassword : string|null;
    createdAt : string;
    allUsersNameNColor ?: {userId : string, userName : string, userColor : string}[];
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
    itemUpdates : ItemUpdateType[]|null;
    switchDesk : (deskId : Desk['id'])=>void;
    refreshDesks : ()=>void;
    createItemDesk : (item : Omit<Item,'id'>) => Promise< Item|null>;
    setAllItems : (items : DeskContextType['items']) => void;
    refreshItems : () => void;
    isNew : (itemId : string)=>boolean;
    markAsViewed : (itemId : string, forced ?: boolean )=>void;
    containsNew : (deskId : string) => boolean;
    setOneItem : (item : Item) => void;
    findOneItem : (itemId : string) => Item
}

export type ModalTypes = 'settings'
| 'social'
| 'showFriend'
| 'login'
| 'register'
| 'createItemPrompt'
| 'createFilePrompt'
| 'deskInviteMenu'
| 'deskMenu'
| 'deskFriendMenu'
| 'createDeskMenu'
| 'itemNamePrompt'
| 'itemDeletePrompt'
| 'itemPasswordPrompt'
| 'socialMenu'
| 'searchFriendSocial'
| 'inviteFriendSocial'
| 'showInvitSocial'
| 'acceptOrNotSocial'
| 'showFriendListSocial'
| 'friendMenuSocial'
| 'confirm'
| 'accountSettingMenu'
| 'avatarMenu'
| null;

export interface ConfirmOptions {
    title: string;
    message: string;
    confirmLabel?: string;  // default: "Confirm"
    cancelLabel?: string;   // default: "Cancel"
    variant?: 'danger' | 'warning' | 'info'; // controls button color
  }

export interface ModalContextType {
    type : ModalTypes[]
    data? : any | ConfirmOptions;
    openModal : (type :ModalTypes, data? :any | ConfirmOptions)=> void;
    closeModal : ()=>void;
    prevModal : ()=>void;
    confirm: (options: ConfirmOptions) => Promise<boolean>; 
    resolveConfirm: (value: boolean) => void;              
}

export interface Item {
    id : string;
    deskId : string;
    name : string;
    type : 'file' | 'folder' | 'note' ; // note is for later purpose when we ll add 'send message feature not taken care of right now !
    x : number;
    y : number;
    accessPassword? : string|null;
    createdBy : User['id'] |null;
    creatorColor ?: User['userColor'];
    parentId : null | Item['id'];
    filePath ?: string|null;
    creatorName ?:string;
}

export interface Note {
    item : Item;
    content : string;
}

export interface SectionContextType { //to tell react what dom to display 
    currentSection : null | Item['id'];
    depth : number;
    count : number;
    updateDepth : (number : number)=>void;
    sectionExist : boolean;
    switchSection : (sectionId : string|null)=>void;
}

export interface ItemUpdateType {
    itemId : string;
    userId : string;
    lastModified : number;
    lastViewed : number;
    deskId : string;
}

export interface TutorialContextType {
    isActive: boolean;
    step: number;
    currentTarget: string  | null; 
    message: string;
    subMessage : string;
    nextStep: ()=>void       
    skipTutorial: ()=>void 
    startTutorial : ()=>void
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