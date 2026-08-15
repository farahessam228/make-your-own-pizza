import { Button } from "../ui/button";

type ProfileHeaderProps = {
    firstName: string
    lastName: string
    phone: string
    email: string
    edit: boolean
    delete: boolean
    onEdit: () => void
    onDelete: () => void
}

export default function ProfileCard({ firstName, lastName, email, phone, edit, delete: delete_, onDelete, onEdit }: ProfileHeaderProps) {
    const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase()
    return (
        <>
            <div className="profile-header">
                <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-primary/10 text-primary flex items-center text-center font-display text-xl justify-center font-bold shrink-0">
                        {initials}
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="font-semibold">{firstName} {lastName}</p>
                        <p className="text-sm text-muted-foreground">{phone}</p>
                        <p className="text-sm text-muted-foreground">{email}</p>
                    </div>
                </div>

                {delete_ ? (
                    delete_ && <Button hidden={delete_} className=" mt-5 ml-8" style={{ marginLeft: "auto" }}>Delete Account</Button>
                ) : (
                    <Button onClick={onDelete} hidden={delete_} className="block mt-5 ml-8">
                        Delete Account
                    </Button>
                )}
                {edit ? (
                    <Button hidden={edit} className="flex items-center gap-3 mt-5 ml-8">Edit Profile</Button>
                ) : (
                    <Button onClick={onEdit} hidden={edit} className="flex items-center gap-3 mt-5 ml-8">
                        Edit Profile
                    </Button>
                )}

            </div>
        </>

    )
}