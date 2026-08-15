import { Button } from "@/components/ui/button"
import { useState } from "react"
import "./profile.css"

type EditProfileProps = {
    firstName: string
    lastName: string
    phone: string
    onCancel: () => void
}




export default function EditProfile({ firstName: initialFirstName, lastName: initialLastName, phone: initialPhone, onCancel }: EditProfileProps) {

    const [firstName, setFirstName] = useState(initialFirstName)
    const [lastName, setLastName] = useState(initialLastName)
    const [phone, setPhone] = useState(initialPhone)

    return (
        <>
            <div className="profile-card">
                <form>
                    <div>
                        <label>First Name</label>
                        <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </div>

                    <div>
                        <label>Last Name</label>
                        <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>

                    <div>
                        <label>Phone</label>
                        <input type="tel" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                </form>

                <div>
                    <Button
                        onClick={() => handleSave(firstName, lastName, phone)}
                        disabled={isFieldEmpty(firstName) ||
                            isFieldEmpty(lastName) ||
                            isFieldEmpty(phone) ||
                            !isPhoneCorrect(phone)}>
                        Save
                    </Button>

                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                </div>
            </div>

        </>
    )
}

function isFieldEmpty(field: string) {
    return field.trim().length === 0
}

function isPhoneCorrect(field: string) {
    if (field.trim().length != 11) {
        return false
    }
    if (field.trim().startsWith("010") || field.trim().startsWith("011") || field.trim().startsWith("015")) {
        return true
    }
    return false;
}

async function handleSave(firstName: string, lastName: string, phone: string) {
    try {
        const response = await fetch("http://localhost:3000/api/user", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                phone,
            })
        })
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message)
        }
        else {
            return data;
        }
    } catch (error) {
        console.error(error);
    }
}
