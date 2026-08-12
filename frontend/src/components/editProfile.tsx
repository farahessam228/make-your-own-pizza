import { Button } from "@/components/ui/button"
import { ProfileField } from "@/components/ui/field"
import { useState } from "react"

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
                <div className="field-group">
                    <ProfileField label="First Name" value={firstName} onChange={setFirstName} />
                    <ProfileField label="Last Name" value={lastName} onChange={setLastName} />
                    <ProfileField label="Phone" value={phone} type="tel" onChange={setPhone} />
                </div>

                <div className="btn-group-small">
                    <Button
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
