import { useEffect, useState } from "react"
import ProfileDetails, { type EditableField } from "@/components/profile/ProfileDetails"
import '../components/profile/profile.css'
import Address from "@/components/profile/address"
import Navbar from "@/components/ui/navbar"
import axiosInstance from "@/api/axiosConfig"

type ProfileProps = {
    firstName: string
    lastName: string
    email: string
    phone: string
    role: number
    isActive: boolean
    address: {
        city: string
        street: string
        district: string
        building_no: string
        floor_no: string
        apt_no: string
    }
}

// Only these three are accepted by the backend's UpdateUserDto.
type ProfileDraft = Pick<ProfileProps, "firstName" | "lastName" | "phone">

export default function ProfilePage() {
    const [profile, setProfile] = useState<ProfileProps>({
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
        }
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
        const saved = await saveProfile(draft)
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
                <Address
                    city={profile.address.city}
                    street={profile.address.street}
                    district={profile.address.district}
                    building_no={profile.address.building_no}
                    floor_no={profile.address.floor_no}
                    apt_no={profile.address.apt_no}
                    onChange={(field: string, value: string) => { }}
                    onSave={() => { }}
                    onCancel={() => { }}
                />
            </div>
        </>
    )
}

const API_BASE = "http://localhost:3000/api/user"


async function getProfile(): Promise<ProfileProps | undefined> {
    try {
        const response = await axiosInstance.get<ProfileProps>("/user/me")
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
