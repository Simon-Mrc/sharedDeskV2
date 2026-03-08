import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { UserProvider } from './context/UserContext.tsx'
import { DeskProvider } from './context/DeskContext.tsx'
import { SectionProvider } from './context/SectionContext.tsx'
import './style/style.css'
import './style/buttons.css'
import './style/containers.css'
import './style/animations.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <UserProvider>
            <DeskProvider>
                <SectionProvider>
                <App />
                </SectionProvider>
            </DeskProvider>
        </UserProvider>
    </StrictMode>
)