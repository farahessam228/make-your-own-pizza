import React, { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import SignUpForm from "@/components/auth/SignUpForm";
import "./AuthPage.css"
export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

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

            <div className={`form-card ${isLogin ? 'login-mode' : 'signup-mode'}`}>
                {isLogin ? <LoginForm /> : <SignUpForm />}
                <div className="submit">
                    <p>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="toggle-btn"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}