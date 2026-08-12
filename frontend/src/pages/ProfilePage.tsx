import { useEffect, useState } from "react"
import ShowProfile from "@/components/profile/showProfile"
import EditProfile from "@/components/profile/editProfile"
import ProfileCard from "@/components/profile/profileCard"

type ProfileProps = {
    firstName: string
    lastName: string
    email: string
    phone: string
}


export default function ProfilePage() {
    const [profile, setProfile] = useState<ProfileProps>({
        firstName: "Karim",
        lastName: "Ahmed",
        email: "ka6260806@gmail.com",
        phone: "01000661832",
    })
    const [isEditing, setIsEditing] = useState(false)
    useEffect(() => {
        async function fetchProfile() {
            const data = await getProfile()
            setProfile(data)
        }

    }, [])
    return (
        <>
            <div className="max-w-lg mx-auto p-6">
                <h3 className="">Account</h3>
                <h2 className="font-display text-2xl font-semibold mb-6">My Profile</h2>

                <div className="flex flex-col gap-6">
                    <ProfileCard
                        firstName={profile.firstName}
                        lastName={profile.lastName}
                        email={profile.email}
                        phone={profile.phone}
                        edit={true}
                        delete={false}
                        onEdit={() => setIsEditing(true)}
                        onDelete={() => { }}
                    />

                    {isEditing ? (
                        <EditProfile onCancel={() => setIsEditing(false)}
                            firstName={profile.firstName}
                            lastName={profile.lastName}
                            phone={profile.phone}
                        />
                    ) : (

                        <ShowProfile
                            firstName={profile.firstName}
                            lastName={profile.lastName}
                            email={profile.email}
                            phone={profile.phone}
                            onEdit={() => setIsEditing(true)}
                        />
                    )}
                </div>
            </div>
        </>
    )
}

async function getProfile() {
    try {
        const response = await fetch("http://localhost:3000/api/user")
        const data = await response.json()
        if (!response.ok) {
            throw new Error(data.message)
        }
        else {
            return data
        }
    } catch (error) {
        console.error(error)
    }
}