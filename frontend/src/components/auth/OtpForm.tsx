import { useRef, useState } from "react";
import React from "react";
import axiosInstance from "../../api/axiosConfig";
import axios from "axios";

interface OtpFormProps {
    email:string;
    onVerifySuccess: () => void;
}

export default function OtpForm({ email, onVerifySuccess }: OtpFormProps){
    const [otp, setOtp] = useState(['','','','','','']);
    
    const [isSubmitting, setSubmitting] = useState(false);
    const [fieldError, setFieldError] = useState('');

    // using useRef for auto focus
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    //handling auto focus function
    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (isNaN(Number(value))) { return; }
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1); 
        setOtp(newOtp);
        if (value && index < 5 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
    }
    //handling keyboard input
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    }
    //hanb3t el otp llbackend b'a k rakam wahed
    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const finalOtpCode = otp.join(''); 
        
        if (finalOtpCode.length < 6) {
            alert("Please enter the full 6-digit code.");
            return; 
        }
        setSubmitting(true); // Tell the app we are loading
        setFieldError(''); // Clear any old errors before trying again
        try {
            const response = await axiosInstance.post('/Verify/verify', { otp: finalOtpCode ,email:email});
            console.log("Success!", response.data);
            onVerifySuccess();
        } catch (error) {
            console.error(error);
            // 1. Check if it's an Axios error first
            if (axios.isAxiosError(error)) {
                // 2. Safely access the response data using optional chaining (?.)
                if (error.response?.data?.message) {
                    alert(error.response.data.message);
                } else {
                    setFieldError('Verification failed, try again'); 
                }
            } else {
                setFieldError('An unexpected error occurred');
            }
        } finally {
            setSubmitting(false);
        }
    }
    return(
        <form className="otp-form-container" onSubmit={handleSubmit}>
            <div className="full-width text-center">
                <h2>Enter Verification Code</h2>
                <p>We sent a 6-digit OTP to your mail</p>
            </div>
            {fieldError && <p style={{ color: 'red', textAlign: 'center' }}>{fieldError}</p>}

            <div className="otp-inputs-container">
                {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1} 
                            value={digit}
                            onChange={(e) => handleChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            ref={(el) => { inputRefs.current[index] = el; }} 
                            className="otp-input"
                        />
                ))}
            </div>
            <div className="full-width" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button type="submit" style={{width:"100%"}} disabled={isSubmitting}>
                    {isSubmitting ? "Verifying..." : "Verify"}
                </button>
            </div>
            <div className="full-width text-center mt-3">
                <p className="resend-text">
                    Didn't get a code? <span className="toggle-btn">Resend</span>
                </p>
            </div>
        </form>
    )
}