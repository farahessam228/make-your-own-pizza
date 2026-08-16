import { useEffect, useState } from "react"
import ProfileDetails, { type EditableField } from "@/components/profile/ProfileDetails"
import '../components/profile/profile.css'
import Address from "@/components/profile/address"
import Navbar from "@/components/ui/navbar"
import axiosInstance from "@/api/axiosConfig"
import { type AddressValues } from "@/components/profile/addressModal"

type ProfileProps = {
    firstName: string
    lastName: string
    email: string
    phone: string
    role: number
    isActive: boolean
    address: AddressValues
}

// Only these three are accepted by the backend's UpdateUserDto.
type ProfileDraft = Pick<ProfileProps, "firstName" | "lastName" | "phone">

const EMPTY_PROFILE: ProfileProps = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: 2,
    isActive: true,
    address: {
        city: "",
        street: "",
        district: "",
        building_no: "",
        floor_no: "",
        apt_no: "",
    },
}

function toDraft(profile: ProfileProps): ProfileDraft {
    return {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
    }
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<ProfileProps>(EMPTY_PROFILE)
    const [isEditing, setIsEditing] = useState(false)
    const [draft, setDraft] = useState<ProfileDraft>(toDraft(EMPTY_PROFILE))
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)


    async function refreshProfile() {
        try {
            const data = await getProfile()
            if (data) {
                const merged = { ...EMPTY_PROFILE, ...data }
                setProfile(merged)
                setDraft(toDraft(merged))
            }
            else
                setError("Could not load your profile.")
        }
        finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        refreshProfile()
    }, [])

    function startEditing() {
        // Seed the draft from the saved profile so a previous cancel can't leak through.
        setDraft(toDraft(profile))
        setIsEditing(true)
    }

    function handleAddressSave(address: AddressValues) {
        setProfile((current) => ({ ...current, address }))
    }

    function handleChange(field: EditableField, value: string) {
        setDraft((current) => ({ ...current, [field]: value }))
    }

    async function handleSave() {
        setError(null)
        setIsSaving(true)
        try {
            const saved = await saveProfile(draft)
            if (!saved) {
                setError("Could not save your changes. Please retry.")
                return
            }
            await refreshProfile()
            setIsEditing(false)
        }
        finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return (
            <>
                <Navbar />
                <div className="profile-page">
                    <p className="profile-page-eyebrow">Account</p>
                    <h2 className="profile-page-title">Loading…</h2>
                </div>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <p className="profile-page-eyebrow">Account</p>
                <h2 className="profile-page-title">My Profile</h2>
                {error && <p className="profile-error" role="alert">{error}</p>}

                <ProfileDetails
                    firstName={isEditing ? draft.firstName : profile.firstName}
                    lastName={isEditing ? draft.lastName : profile.lastName}
                    phone={isEditing ? draft.phone : profile.phone}
                    email={profile.email}
                    isSaving={isSaving}
                    isEditing={isEditing}
                    onEdit={startEditing}
                    onChange={handleChange}
                    onCancel={() => setIsEditing(false)}
                    onSave={handleSave}
                />
                <Address
                    city={profile.address.city}
                    street={profile.address.street}
                    district={profile.address.district}
                    building_no={profile.address.building_no}
                    floor_no={profile.address.floor_no}
                    apt_no={profile.address.apt_no}
                    onSave={handleAddressSave}
                    onDelete={() => { }}
                />
            </div>
        </>
    )
}



type UserResponse = Pick<ProfileProps, "firstName" | "lastName" | "email" | "phone">

async function getProfile(): Promise<UserResponse | undefined> {
    try {
        const response = await axiosInstance.get<UserResponse>("/user/me")
        return response.data
    } catch (error) {
        console.error(error)
    }
}

async function saveProfile(draft: ProfileDraft): Promise<boolean> {
    try {
        await axiosInstance.put("/user/me", draft)
        return true
    } catch (error) {
        console.error(error)
        return false
    }
}

