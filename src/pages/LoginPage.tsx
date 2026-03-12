import { useState, type JSX } from "react";
import { LoginPrompt } from "../components/prompts/LoginPrompt";
import { RegisterPrompt } from "../components/prompts/RegisterPrompt";

///////////// LOGIN PAGE YOU DON T SAY ///////////////////
export function LoginPage(): JSX.Element {
    const [showLogin, setShowLogin] = useState<boolean>(false);
    const [showRegister, setShowRegister] = useState<boolean>(false);
    const [animation , setAnimation] = useState<string>('');
    return (
        <div className={`login-page ${animation}`}>

            {/* CORE APP PRESENTATION */}
            <div className="presentation-container">
                <div className="presentation-content">
                    <div className="logo-area">
                        <span className="logo-icon">🗂️</span>
                        <h1 className="logo-title">SharedDesk</h1>
                    </div>
                    <h2 className="presentation-tagline">
                        Your space.<br />Shared your way.
                    </h2>
                    <p className="presentation-description">
                        Create desks, organize files and folders, and invite anyone to collaborate —
                        friends, family, colleagues, or your whole community.
                    </p>
                    <div className="presentation-features">
                        <div className="feature-item">
                            <span className="feature-icon">👨‍👩‍👧‍👦</span>
                            <span>Built for everyone — kids, adults, grandparents</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🔗</span>
                            <span>Share a desk with a single link</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">📁</span>
                            <span>Organize files and folders your way</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🎨</span>
                            <span>Personalize with your own color</span>
                        </div>
                    </div> 
                </div>
            </div>

            {/* LOGIN AND REGISTER PART */}
            <div className="login-container">
                <button onClick={()=>setShowLogin(true)}>Welcome Back ! Let's Login</button>
                <button onClick={()=>setShowRegister(true)}>New to SharedDesk ? Create an account !</button>
                {showLogin && 
                <LoginPrompt 
                onClose = {()=> setShowLogin(false)}
                setAnimation = {()=>setAnimation('fadeOut')} />
                }
                {showRegister &&
                <RegisterPrompt onClose = {()=> setShowRegister(false)}
                setAnimation = {()=>setAnimation('fadeOut')} />
                }
            </div>

            {/* SMALL FOOTER PART */}
            <footer className="footer-container">
                <div className="footer-content">
                    <span className="footer-text">SharedDesk v2 — open source project</span>
                    <div className="footer-links">
                        <a
                            href="https://github.com/Simon-Mrc/sharedDeskV2"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            <span>⬡</span> GitHub
                        </a>
                    </div>
                </div>
            </footer>

        </div>
    )
}