export type EditableField = "firstName" | "lastName" | "phone"

type ProfileValues = {

    firstName: string
    lastName: string
    email: string
    phone: string
    isSaving: boolean

}

type ProfileDetailsProps = ProfileValues & {
    isEditing: boolean
    onEdit: () => void
    onChange: (field: EditableField, value: string) => void
    onCancel: () => void
    // ProfilePage owns the draft state, so it already has every edit by save time.
    onSave: () => void
}


export default function ProfileDetails({ firstName, lastName, email, phone, isSaving, isEditing, onEdit, onChange, onCancel, onSave }: ProfileDetailsProps) {
    const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase()

    return (
        <>
            <div className="profile-shell">
                <div className="profile-intro">
                    <header className="profile-identity">

                        <div className="pizza-avatar ">
                            <div className="pizza-ring pizza-ring--1"></div>
                            <div className="pizza-ring pizza-ring--2"></div>
                            <div className="pizza-ring pizza-ring--3"></div>
                            <div className="pizza-ring pizza-ring--4"></div>
                            <div className="topping t-1"></div>
                            <div className="topping t-2"></div>
                            <div className="topping t-3"></div>
                            <div className="topping t-4"></div>
                            <span className="pizza-avatar-initials">{initials}</span>
                        </div>

                        <div className="profile-data">
                            <h2>{firstName} {lastName}</h2>
                            <p>{email}</p>
                        </div>

                    </header>
                </div>
                <form className="profile-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        onSave();
                    }}
                >
                    <div className="profile-section">
                        <div className="profile-section-header">
                            <h3 className="profile-section-title">Basic Information</h3>
                            {!isEditing &&
                                <button type="button" onClick={onEdit}>
                                    Edit Profile
                                </button>}
                        </div>

                        <div className="info-grid">
                            <InfoRow
                                label="First Name"
                                value={firstName}
                                isEditing={isEditing}
                                onChange={(v) => onChange("firstName", v)}
                            />
                            <InfoRow
                                label="Last Name"
                                value={lastName}
                                isEditing={isEditing}
                                onChange={(v) => onChange("lastName", v)}
                            />
                            <InfoRow
                                label="Email"
                                value={email}
                                isEditing={isEditing}
                                readOnly
                            />
                            <InfoRow
                                label="Phone"
                                value={phone}
                                isEditing={isEditing}
                                onChange={(v) => onChange("phone", v)}
                            />
                        </div>

                        {isEditing && (
                            <div className="btn-group-small">
                                <button type="submit" disabled={isSaving}>
                                    {isSaving ? "Saving..." : "Save"}
                                </button>
                                <button type="button" onClick={onCancel} disabled={isSaving}>
                                    Cancel
                                </button>
                            </div>
                        )}

                    </div>
                </form>
            </div>

        </>
    )
}

export function InfoRow({ label, value, isEditing, onChange, readOnly }: {
    label: string
    value: string
    isEditing: boolean
    onChange?: (value: string) => void
    readOnly?: boolean
}) {
    const editable = isEditing && !readOnly && onChange

    return (
        <div className="info-row">
            <span>{label}</span>

            {editable ? (
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange?.(e.target.value)}
                />
            ) : (
                <span className="info-row-value">{value}</span>
            )}
        </div>

    )
}
