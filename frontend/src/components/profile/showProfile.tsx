import { Button } from "@/components/ui/button"
import { ProfileField } from "@/components/ui/field"

type ShowProfileProps = {
    firstName: string
    lastName: string
    email: string
    phone: string
    onEdit: () => void
}

export default function ShowProfile({ firstName, lastName, phone, onEdit }: ShowProfileProps) {
    return (
        <div className="profile-card">
            <div className="field-group">
                <ProfileField label="First Name" value={firstName} />
                <ProfileField label="Last Name" value={lastName} />
                <ProfileField label="Phone" value={phone} />
            </div>

            <Button onClick={onEdit} className="btn-large">
                Edit Profile
            </Button>
        </div >
    )
}
