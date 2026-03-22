import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { UserProvider } from './context/UserContext.tsx'
import { TutorialProvider } from './context/TutorialContext.tsx'
import { DeskProvider } from './context/DeskContext.tsx'
import { SectionProvider } from './context/SectionContext.tsx'
import { ModalManager } from './modals/ModalManager.tsx'
import { ModalProvider } from './context/ModalContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import './style/style.css'
import './style/buttons.css'
import './style/containers.css'
import './style/animations.css'
import './style/loginPage.css'
import './style/prompt.css'
import './style/notAshamedTree.css'
import './style/noteStyle.css'
import './style/colorPicker.css'
import './style/dragZone.css'
import './style/tutorial.css'

createRoot(document.getElementById('root')!).render(   
    <StrictMode>
        <BrowserRouter>
            <ModalProvider>
                <UserProvider>
                    <TutorialProvider>    
                        <DeskProvider>
                            <SectionProvider>
                                <App />
                                <ModalManager/>
                            </SectionProvider>
                        </DeskProvider>
                    </TutorialProvider>
                </UserProvider>
            </ModalProvider>
        </BrowserRouter>
    </StrictMode>
)