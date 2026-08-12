import {
    Field,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field.tsx"

import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { useState } from "react"


export default function RegisterComponent() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const validation = isPasswordValid(password)
    const emailValidation = isEmailValid(email)
    return (

        <div className="w-full max-w-sm mx-auto p-6 rounded-2xl">

            <div className="pt-4">
                <label className="text-sm">Email</label>
                <Input type="Email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className="pt-4">
                <label className="text-sm">Password</label>
                <Input type="Password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <div className="pt-4 pb-4">
                    <label className="text-sm">Confirm Password</label>
                    <Input type="password"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                </div>
                <ul>
                    <li>
                        {validation.hasMinimumlength ? "✅" : "❌"} At least 8 characters
                    </li>

                    <li >
                        {validation.hasUppercase ? "✅" : "❌"} At least one uppercase letter
                    </li>

                    <li>
                        {validation.hasLowercase ? "✅" : "❌"} At least one lowercase letter
                    </li>

                    <li>
                        {validation.hasNumber ? "✅" : "❌"} At least one number
                    </li>

                    <li>
                        {password === confirmPassword ? "✅" : "❌"} Password and Confirm Password should match
                    </li>
                </ul>
            </div>
            <div>
                <Button disabled={!validation.allValid
                    || !emailValidation.hasValidEmail
                    || password !== confirmPassword}
                    onClick={() => handleSignUp(email, password)}>Signup</Button>
            </div>
        </div>


    )
}

function handleSignUp(email: string, password: string) {
    //write the code to pass the variable to the backend
}


function isEmailValid(email: string) {
    const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    return {
        hasValidEmail
    }
}

function isPasswordValid(password: string) {
    const hasMinimumlength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    return {
        hasMinimumlength,
        hasUppercase,
        hasLowercase,
        hasNumber,
        allValid: hasMinimumlength && hasUppercase && hasLowercase && hasNumber
    };
}

