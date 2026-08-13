import React,{useState}from "react";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";
import OtpForm from "../components/auth/OtpForm";
import './AuthPage.css'


export default function AuthPage(){
    // mohem, new view for the OTP
    const [currentView, setCurrentView] = useState<'login' | 'signup' | 'otp'>('signup');

    return (
    <div className="auth-container ">
        <div className="pizza-ring ring-1"></div>
        <div className="pizza-ring ring-2"></div>
        <div className="pizza-ring ring-3"></div>
        <div className="pizza-ring ring-4"></div>
        <div className="pizza-ring ring-5"></div>
        <div className="pizza-ring ring-6"></div>

        <div className="topping t-1"></div>
        <div className="topping t-2"></div>
        <div className="topping t-3"></div>
        <div className="topping t-4"></div>

        {/*new rendering options  */}
        <div className={`form-card ${currentView=== "signup" ? 'signup-mode' : "login-mode"}`}>
            {currentView === 'login' && <LoginForm/>}
            {currentView === 'signup' && <SignUpForm onSignUpSuccess={() => setCurrentView('otp')} />}
            {currentView === 'otp' && <OtpForm onVerifySuccess={() => setCurrentView('login')} />}

            {currentView!=="otp"&&(
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
            {currentView === 'signup' && (
                <button onClick={() => setCurrentView('otp')} style={{marginTop: '10px'}}>
                    Go to OTP (Test)
                </button>
            )}
        </div>
    </div>
    );
}