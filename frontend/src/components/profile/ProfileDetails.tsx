import OrderHistory from "../Customer History/OrderHistory"

export type EditableField = "firstName" | "lastName" | "phone"

type ProfileDetailsProps = {

    firstName: string
    lastName: string
    email: string
    phone: string
    role: number
    isActive: boolean
    isEditing: boolean
    onDelete: () => void
    onEdit: () => void
    onChange: (field: EditableField, value: string) => void
    onCancel: () => void
    onSave: () => void
}

// Backend Role enum: Delivery = 0, Manager = 1, Customer = 2.
// Program.cs registers no JsonStringEnumConverter, so this arrives as a number.
const ROLE_LABELS: Record<number, string> = {
    0: "Delivery",
    1: "Manager",
    2: "Customer",
}

export default function ProfileDetails({ firstName, lastName, email, phone, role, isActive, isEditing, onDelete, onEdit, onChange, onCancel, onSave }: ProfileDetailsProps) {
    const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase()

    return (
        <>
            <div className="profile-shell">
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

                <div className="profile-section">
                    <div className="profile-section-header">
                        <h3 className="profile-section-title">Basic Information</h3>
                        {!isEditing &&
                            <button onClick={onEdit}>
                                Edit Profile
                            </button>}
                    </div>

                    <div className="info-grid">
                        <InfoRow
                            label="First Name"
                            value={firstName}
                            isEditing={isEditing} onChange={(v) => onChange("firstName", v)}
                        />
                        <InfoRow
                            label="Last Name"
                            value={lastName}
                            isEditing={isEditing} onChange={(v) => onChange("lastName", v)}
                        />
                        <InfoRow
                            label="Email"
                            value={email}
                            isEditing={isEditing} readOnly
                        />
                        <InfoRow
                            label="Phone"
                            value={phone}
                            isEditing={isEditing} onChange={(v) => onChange("phone", v)}
                        />
                        <InfoRow
                            label="Role"
                            value={ROLE_LABELS[role] ?? "Unknown"}
                            isEditing={isEditing} readOnly
                        />
                        <InfoRow
                            label="Active"
                            value={isActive ? "Active" : "Inactive"}
                            isEditing={isEditing} readOnly
                        />
                    </div>

                    {isEditing && (
                        <div className="btn-group-small">
                            <button onClick={onSave}>
                                Save
                            </button>
                            <button onClick={onCancel}>
                                Cancel
                            </button>
                        </div>
                    )}

                </div>
            </div>

            <div>
                <OrderHistory />
            </div>
        </>
    )
}

function InfoRow({ label, value, isEditing, onChange, readOnly, span }: {
    label: string
    value: string
    isEditing: boolean
    onChange?: (value: string) => void
    readOnly?: boolean
    span?: boolean

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
