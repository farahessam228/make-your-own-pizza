import { useEffect, useState } from "react"
import ProfileDetails, { type EditableField } from "@/components/profile/ProfileDetails"
import '../components/profile/profile.css'
import Navbar from "@/components/ui/navbar"

type ProfileProps = {
    id?: string
    firstName: string
    lastName: string
    email: string
    phone: string
    role: number
    isActive: boolean
}

// Only these three are accepted by the backend's UpdateUserDto.
type ProfileDraft = Pick<ProfileProps, "firstName" | "lastName" | "phone">

export default function ProfilePage() {
    const [profile, setProfile] = useState<ProfileProps>({
        firstName: "Karim",
        lastName: "Ahmed",
        email: "karim@example.com",
        phone: "01000661832",
        role: 2,
        isActive: true,
    })
    const [isEditing, setIsEditing] = useState(false)
    const [draft, setDraft] = useState<ProfileDraft>({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
    })

    useEffect(() => {
        async function fetchProfile() {
            const data = await getProfile()
            if (data) {
                setProfile(data)
                setDraft({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phone: data.phone,
                })
            }
        }
        fetchProfile()
    }, [])

    function startEditing() {
        // Seed the draft from the saved profile so a previous cancel can't leak through.
        setDraft({
            firstName: profile.firstName,
            lastName: profile.lastName,
            phone: profile.phone,
        })
        setIsEditing(true)
    }

    function handleChange(field: EditableField, value: string) {
        setDraft((current) => ({ ...current, [field]: value }))
    }

    async function handleSave() {
        const saved = await saveProfile(profile.id, draft)
        if (saved) {
            setProfile((current) => ({ ...current, ...draft }))
            setIsEditing(false)
        }
    }

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <p className="profile-page-eyebrow">Account</p>
                <h2 className="profile-page-title">My Profile</h2>

                <ProfileDetails
                    firstName={isEditing ? draft.firstName : profile.firstName}
                    lastName={isEditing ? draft.lastName : profile.lastName}
                    phone={isEditing ? draft.phone : profile.phone}
                    email={profile.email}
                    role={profile.role}
                    isActive={profile.isActive}
                    isEditing={isEditing}
                    onEdit={startEditing}
                    onChange={handleChange}
                    onCancel={() => setIsEditing(false)}
                    onSave={handleSave}
                    onDelete={() => { }}
                />
            </div>
        </>
    )
}

const API_BASE = "http://localhost:3000/api/user"

async function getProfile(): Promise<ProfileProps | undefined> {
    try {
        const response = await fetch(API_BASE)
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message)
        }
        return data
    } catch (error) {
        console.error(error)
    }
}

async function saveProfile(id: string | undefined, draft: ProfileDraft): Promise<boolean> {
    if (!id) {
        console.error("Cannot save: no user id. GET /api/user must return the signed-in user.")
        return false
    }
    try {
        // UserController exposes PUT /api/user/{id} — there is no PATCH route.
        const response = await fetch(`${API_BASE}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(draft),
        })
        if (!response.ok) {
            throw new Error(`Update failed with ${response.status}`)
        }
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}