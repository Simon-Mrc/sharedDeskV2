import { createContext, useEffect, useState, type ReactNode } from "react";
import type{ TutorialContextType } from "../../shared/types";


export const TutorialContext = createContext<TutorialContextType|null>(null)


export type TriggerType =
    | 'click'
    | 'dblclick'
    | 'contextmenu'
    | 'none'
    | {auto:number}

export type TutorialStep = {
    step      : number
    target    : string | null
    trigger   : TriggerType
    message   : string
    submessage?: string        // ← optional second line for longer explanations!
}
    
export const TUTORIAL_STEPS : TutorialStep[] = [

    ////////////////////////////// PHASE 1 : SIDEBAR & DESK //////////////////////////////
    {
        step       : 1,
        target     : 'sidebarToggle',
        trigger    : 'click',
        message    : "👈 Welcome! Let's start with your sidebar! The source for everything",
        submessage : "Click the toggle button to open it!"
    },
    {
        step       : 2,
        target     : 'createDesk',
        trigger    : 'click',
        message    : "🖥️ Now let's Create your first desk!🖥️",
        submessage : "A desk is your shared workspace or a shared space for friends and family!"
    },
    {
        step       : 3,
        target     : 'deskNameInput',
        trigger    : 'none',
        message    : "✏️ Give your desk a name...",
    },
    {
        step       : 4,
        target     : 'confirmDesk',
        trigger    : 'click',
        message    : "✅ Looking good! Confirm it!",
    },

    ////////////////////////////// PHASE 2 : WELCOME //////////////////////////////
    {
        step       : 5,
        target     : null,
        trigger    : {auto:4500},
        message    : "🎉 Welcome to your new desk!",
    },
    {
        step       : 6,
        target     : null,
        trigger    : {auto:5000},
        message    : "💡 Think of it like an online computer...",
        submessage : "You can share it with friends, family or coworkers!"
    },

    ////////////////////////////// PHASE 3 : RIGHT CLICK & CREATE ITEM PROMPT //////////////////////////////
    {
        step       : 7,
        target     : 'deskDisplay',
        trigger    : 'contextmenu',
        message    : "🖱️ Try right clicking anywhere in your space!",
    },
    {
        step       : 8,
        target     : null,
        trigger    : {auto:5000},
        message    : "✨ Here you can create many things!",
    },
    {
        step       : 9,
        target     : 'fileButton',
        trigger    : {auto:4500},
        message    : "📑 A file...",
    },
    {
        step       : 10,
        target     : 'noteButton',
        trigger    : {auto:4500},
        message    : "📝 A note...",
    },
    {
        step       : 11,
        target     : 'folderButton',
        trigger    : {auto:4500},
        message    : "📁 Or a folder!",
        submessage : "Let's create one! Click on folder!"
    },
    {
        step       : 12,
        target     : 'folderNameInput',
        trigger    : 'none',
        message    : "✏️ Give your folder a name!",
    },
    {
        step       : 13,
        target     : 'confirmFolder',
        trigger    : 'click',
        message    : "✅ Create it!",
    },

    ////////////////////////////// PHASE 4 : FOLDER INTERACTION //////////////////////////////
    {
        step       : 14,
        target     : null,
        trigger    : {auto:4500},
        message    : "🎉 There it is!",
        submessage : "Like a real computer, you can right click it to see options!"
    },
    {
        step       : 15,
        target     : 'folder',
        trigger    : 'contextmenu',
        message    : "🔧 Right click your folder!",
    },
    {
        step       : 16,
        target     : null,
        trigger    : 'click',
        message    : "👀 You'll discover all these options later!",
    },
    {
        step       : 17,
        target     : 'folder',
        trigger    : 'dblclick',
        message    : "📂 Now try double clicking your folder!",
        submessage : "Folders let you organise your desk into sections!"
    },
    {
        step       : 18,
        target     : 'folderTree',
        trigger    : 'click',
        message    : "🌳 Welcome to your new section!",
        submessage : "Click the tree icon to see your full desk structure!"
    },

    ////////////////////////////// PHASE 5 : NOTE //////////////////////////////
    {
        step       : 19,
        target     : 'deskDisplay',
        trigger    : 'contextmenu',
        message    : "📝 Now let's create a note!",
        submessage : "Right click anywhere again..."
    },
    {
        step       : 20,
        target     : 'noteButton',
        trigger    : 'click',
        message    : "📝 Pick note this time!",
    },
    {
        step       : 21,
        target     : 'noteNameInput',
        trigger    : 'none',
        message    : "✏️ Give your note a name!",
    },
    {
        step       : 22,
        target     : 'confirmNote',
        trigger    : 'click',
        message    : "✅ Create it!",
    },
    {
        step       : 23,
        target     : 'note',
        trigger    : 'dblclick',
        message    : "✏️ Double click your note to open it!",
    },
    {
        step       : 24,
        target     : 'noteContent',
        trigger    : 'none',
        message    : "💾 Type something!",
        submessage : "Notes save automatically as you type... no need to press save!"
    },
    {
        step       : 25,
        target     : 'closeNote',
        trigger    : 'click',
        message    : "✅ Close it!",
    },
    {
        step       : 26,
        target     : 'note',
        trigger    : 'dblclick',
        message    : "🔁 Now reopen it!",
        submessage : "See? Your content is still there!"
    },
    {
        step       : 27,
        target     : 'closeNote',
        trigger    : 'click',
        message    : "✅ Perfect!",
    },

    ////////////////////////////// PHASE 6 : FILE UPLOAD //////////////////////////////
    {
        step       : 28,
        target     : 'deskDisplay',
        trigger    : 'contextmenu',
        message    : "📑 Last thing! Create an empty file!",
        submessage : "Right click one more time..."
    },
    {
        step       : 29,
        target     : 'fileButton',
        trigger    : 'click',
        message    : "📑 Pick file!",
    },
    {
        step       : 30,
        target     : 'fileNameInput',
        trigger    : 'none',
        message    : "✏️ Give your file a name!",
    },
    {
        step       : 31,
        target     : 'confirmFile',
        trigger    : 'click',
        message    : "✅ Create it!",
    },
    {
        step       : 32,
        target     : 'file',
        trigger    : 'dblclick',
        message    : "📎 Double click your file!",
        submessage : "You can attach any file for friends or coworkers to download!"
    },
    {
        step       : 33,
        target     : null,
        trigger    : {auto:7000},
        message    : "🖱️ You can also drag and drop directly onto the desk!",
    },

    ////////////////////////////// PHASE 7 : OUTRO //////////////////////////////
    {
        step       : 34,
        target     : null,
        trigger    : {auto:7000},
        message    : "👥 The whole point of SharedDesk is sharing!",
        submessage : "Invite someone to your desk and discover the rest together 😉"
    },
    {
        step       : 35,
        target     : null,
        trigger    : {auto:6000},
        message    : "🚀 You're all set!",
        submessage : "Have fun! 🎉"
    },
]
    

export function TutorialProvider({children} : {children : ReactNode}){
    const[isActive , setIsActive] = useState<boolean>(false);
    const[step , setStep] = useState<number>(0);
    const[currentTarget,setCurrentTarget] = useState<string|null>('');
    const[message,setMessage] = useState<string>('');
    const [subMessage, setSubMessage] = useState<string>('');


    function nextStep(){
        const next = step +1;
        if(next >= TUTORIAL_STEPS.length){
            skipTutorial()
            return
        }
        setCurrentTarget(TUTORIAL_STEPS[next].target ?? null);
        setMessage(TUTORIAL_STEPS[next].message);
        setSubMessage(TUTORIAL_STEPS[next].submessage??'')
        setStep((prev)=>prev+1);
    }

    useEffect(()=>{
        if(!isActive || step >=TUTORIAL_STEPS.length){return}
        const trigger = TUTORIAL_STEPS[step].trigger
        if(typeof trigger === 'object' && 'auto' in trigger){
            const timer = setTimeout(()=>{
                nextStep();
            },trigger.auto)
            return ()=> clearTimeout(timer);
        }
    },[step])
    
    function skipTutorial(){
        setIsActive(false);
        setStep(1000);
        setCurrentTarget('');
    }

    function startTutorial(){
        setStep(0);
        setCurrentTarget(TUTORIAL_STEPS[0].target ?? null);
        setMessage(TUTORIAL_STEPS[0].message);
        setSubMessage(TUTORIAL_STEPS[0].submessage ?? '');
        setIsActive(true);
    }

    return(
        <TutorialContext.Provider value = {{
        isActive,
        step,
        currentTarget,
        message,
        subMessage,
        nextStep,
        skipTutorial,
        startTutorial
        }}>
            {children}
        </TutorialContext.Provider>
    )

}