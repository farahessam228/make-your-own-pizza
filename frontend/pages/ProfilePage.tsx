import { useState } from "react"
import ShowProfile from "@/components/showProfile"
import EditProfile from "@/components/editProfile"
import ProfileCard from "@/components/profileCard"

export default function ProfilePage() {
    const [profile, setProfile] = useState({
        firstName: "Karim",
        lastName: "Ahmed",
        email: "ka6260806@gmail.com",
        phone: "01000661832",
    })

    const [isEditing, setIsEditing] = useState(false)

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
                        onEdit={() => setIsEditing(true)}

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