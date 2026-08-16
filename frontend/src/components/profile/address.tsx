import { useState } from "react";
import "./profile.css"
import "./adress.css"
import AddressModal from "./addressModal";
import { AddressValues } from "./addressModal";

type AddressProps = {

    city: string;
    street: string;
    district: string;
    building_no: string;
    floor_no: string;
    apt_no: string;
    onSave: (draft: AddressValues) => void;
    onDelete: () => void
}


export default function Address({ city, street, district, building_no, floor_no, apt_no, onSave, onDelete }: AddressProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <div className="address-section">
                <header className="address-section-header">
                    <h2>Your Addresses</h2>
                    <button className="add-btn" disabled >Add address</button>
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
                            <button onClick={() => setIsModalOpen(true)} >Edit</button>
                            <button onClick={onDelete}>

                                Delete

                            </button>
                        </div>
                    </div>
                </section >
                {isModalOpen && (
                    <AddressModal
                        city={city}
                        street={street}
                        district={district}
                        building_no={building_no}
                        floor_no={floor_no}
                        apt_no={apt_no}

                        onCancel={() => setIsModalOpen(false)}
                        onSave={(draft) => {
                            setIsModalOpen(false)
                            onSave(draft)
                        }}
                        onDelete={onDelete}
                    />
                )}

            </div>
        </>
    )
}
