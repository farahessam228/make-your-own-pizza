import React,{useState}from "react";
import LoginForm from "../components/auth/LoginForm";
import SignUpForm from "../components/auth/SignUpForm";
export default function AuthPage(){
    const [isLogin, setIsLogin] = useState(true);

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        
        {/* هنا بنعرض الـ Component المناسب بناءً على الـ state */}
        {isLogin ? <LoginForm /> : <SignUpForm />}
        
        {/* زرار التبديل الذكي */}
        <div className="mt-4 text-center">
            <p>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
                onClick={() => setIsLogin(!isLogin)}
                style={{ color: 'blue', background: 'none', border: 'none', cursor: 'pointer' }}
            >
                {isLogin ? 'Sign Up' : 'Login'}
            </button>
            </p>
        </div>
        </div>
    </div>
    );
}