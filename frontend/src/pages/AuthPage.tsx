import React, { useState } from "react";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";
import OtpForm from "../components/auth/OtpForm";
import './AuthPage.css'


export default function AuthPage() {
    const [currentView, setCurrentView] = useState<'login' | 'signup' | 'otp'>('signup');
    const [savedEmail, setSavedEmail] = useState('');

    return (
        <div className="auth-container ">
            <div className="pizza-ring pizza-ring--1"></div>
            <div className="pizza-ring pizza-ring--2"></div>
            <div className="pizza-ring pizza-ring--3"></div>
            <div className="pizza-ring pizza-ring--4"></div>

            <div className="topping t-1"></div>
            <div className="topping t-2"></div>
            <div className="topping t-3"></div>
            <div className="topping t-4"></div>

            <div className={`form-card ${currentView === "signup" ? 'signup-mode' : "login-mode"}`}>
                
                {currentView === 'login' && <LoginForm />}
                {currentView === 'signup' && (
                    <SignUpForm 
                        onSignUpSuccess={(emailFromChild) => {
                            setSavedEmail(emailFromChild);
                            setCurrentView('otp');
                        }} 
                    />
                )}
                {currentView === 'otp' && (
                    <OtpForm 
                        email={savedEmail} 
                        onVerifySuccess={() => setCurrentView('login')} 
                    />
                )}

                {currentView !== "otp" && (
                    <div className="text-center mt-3 full-width">
                        <p>
                            {currentView === 'login' ? "Don't have an account? " : "Already have an account? "}
                            <button
                                onClick={() => setCurrentView(currentView === 'login' ? 'signup' : 'login')}
                                className="toggle-btn"
                            >
                                {currentView === 'login' ? 'Sign Up' : 'Login'}
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}