import { useState } from "react";
import { InfoRow } from "./ProfileDetails";
import "./profile.css"
import "./adress.css"

type AddressProps = {

    city: string;
    street: string;
    district: string;
    building_no: string;
    floor_no: string;
    apt_no: string;
    onChange: (field: string, value: string) => void;
    onCancel: () => void;
    onSave: () => void;
}


export default function Address({ city, street, district, building_no, floor_no, apt_no, onChange, onCancel, onSave }: AddressProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <div className="address-section">
                <header className="address-section-header">
                    <h2>Saved addresses</h2>
                    <button className="add-btn" onClick={() => setIsModalOpen(true)}>Add address</button>
                </header>
                <section className="address-section-details">
                    <div className="address-box">
                        <div className="address-list">
                            <p> {city}, {street}</p>
                            <p>District: {district}</p>
                            <p>Building No: {building_no}</p>
                            <p>Floor No: {floor_no}</p>
                            <p>Apartment No: {apt_no}</p>
                        </div>

                        <div className="address-actions-btn">
                            <button >Edit</button>
                            <button >Delete</button>
                        </div>
                    </div>
                </section >
            </div>
            {isModalOpen && (
                <div className="address-modal-overlay">
                    <div className="address-modal">
                        <div className="address-modal-header">
                            <h2>add address modal</h2>
                        </div>
                        <form className="address-modal-body">
                            <div className="info-row">
                                <InfoRow
                                    label="City"
                                    value={city}
                                    isEditing={true}
                                    readOnly={false}
                                    onChange={(v) => onChange("city", v)} />
                                <InfoRow
                                    label="Street"
                                    value={street}
                                    isEditing={true}
                                    onChange={(v) => onChange("street", v)} />
                                <InfoRow
                                    label="District"
                                    value={district}
                                    isEditing={true}
                                    onChange={(v) => onChange("district", v)} />
                                <InfoRow
                                    label="Building No"
                                    value={building_no}
                                    isEditing={true}
                                    onChange={(v) => onChange("building_no", v)} />
                                <InfoRow
                                    label="Floor No"
                                    value={floor_no}
                                    isEditing={true}
                                    readOnly={false}
                                    onChange={(v) => onChange("floor_no", v)} />
                                <InfoRow
                                    label="Apartment No"
                                    value={apt_no}
                                    isEditing={isModalOpen}
                                    readOnly={false}
                                    onChange={(v) => onChange("apt_no", v)} />
                                <div className="btn-group-small">
                                    <button onClick={() => onSave()}>Add address</button>
                                    <button onClick={() => { setIsModalOpen(false), onCancel() }}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}