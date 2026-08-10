import {
    Field,
    FieldDescription,
    FieldLabel,
} from "@/components/ui/field.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { useState } from "react"

export default function LoginPage() {
    const [password, setPassword] = useState("")
    const validation = isPasswordValid(password)

    return (
        <div>
            <Input type="Password"
                placeholder="Enter Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <ul>
                <li>
                    {validation.hasMinimumlength ? "✅" : "❌"} At least 8 characters
                </li>

                <li>
                    {validation.hasUppercase ? "✅" : "❌"} At least one uppercase letter
                </li>

                <li>
                    {validation.hasLowercase ? "✅" : "❌"} At least one lowercase letter
                </li>

                <li>
                    {validation.hasNumber ? "✅" : "❌"} At least one number
                </li>
            </ul>
            <div>
                <Button disabled={!validation.allValid} onClick={() => handleLogin(password)}>Login</Button>
            </div>

        </div>

    )
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
function handleLogin(password: string) {
    //write passing the variable to the backend
}


export function fieldLogin() {
    return (
        <Field>
            <FieldLabel htmlFor="input-password">Password</FieldLabel>
            <Input id="input-password" type="password" placeholder="Enter your password" />
            <FieldDescription>
                Password Field
            </FieldDescription>
            <Button>Login</Button>
        </Field>
    )
}




