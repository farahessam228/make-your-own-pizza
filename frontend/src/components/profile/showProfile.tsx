import { Button } from "@/components/ui/button"
import '../../components/profile/profile.css'

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
            <label>First Name</label>
            <input type="text" value={firstName} readOnly />

            <label>Last Name</label>
            <input type="text" value={lastName} readOnly />

            <label>Phone</label>
            <input type="tel" value={phone} readOnly />

            <Button onClick={onEdit} className="btn-large">
                Edit Profile
            </Button>
        </div >
    )
}
