import { useRef, useState } from "react";
import React from "react";

export default function OtpForm(){
    const [otp,setOtp]=useState(['','','','','','']);
    // using useRef for auto focus
    const inputRefs=useRef<(HTMLInputElement | null)[]>([]);

    //handling auto focus function
    const handleChange=(index:number ,e:React.ChangeEvent<HTMLInputElement>)=>{
        const value=e.target.value;
        if (isNaN(Number(value))){return;}
        const newOtp=[...otp];
        newOtp[index] = value.substring(value.length - 1); //msh fahma
        setOtp(newOtp);
        if(value && index <5 && inputRefs.current[index+1]){
        inputRefs.current[index + 1]?.focus();
        }
    }
    //handling keyboard input
    const handleKeyDown=(index:number, e:React.KeyboardEvent<HTMLInputElement>)=>{
        if (e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
        }
    }
    //hanb3t el otp llbackend b'a k rakam wahed
    const handleSubmit=(e:React.SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault();
        const finalOtpCode = otp.join(''); 
    }
    return(
        <form className="otp-form-container" onSubmit={handleSubmit}>
            <div className="full-width text-center">
                <h2>Enter Verification Code</h2>
                <p>We sent a 6-digit OTP to your mail</p>
            </div>
            <div className="otp-inputs-container">
                {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength={1} // أقصى حاجة رقم واحد
                            value={digit}
                            onChange={(e) => handleChange(index, e)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            ref={(el) => { inputRefs.current[index] = el; }} 
                            className="otp-input"
                        />
                    ))}
            </div>
            <div className="full-width" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <button type="submit" style={{width:"100%"}}>Verify</button>
            </div>
            <div className="full-width text-center mt-3">
                <p className="resend-text">
                    Didn't get a code? <span className="toggle-btn">Resend</span>
                </p>
            </div>
        </form>
    )
}