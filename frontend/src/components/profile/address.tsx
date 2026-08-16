type AddressProps = {
    city: string;
    street: string;
    district: string;
    building_no: string;
    floor_no: string;
    apt_no: string;
}

export default function Address({ city, street, district, building_no, floor_no, apt_no }: AddressProps) {
    return (
        <>
            <div className="address-section">
                <header className="address-section-header">
                    <h2>Saved addresses</h2>
                    {/* TODO: when we have a modal or inline editing for the address, hook up an “Add address” button here. */}
                    <button className="add-btn" disabled>Add address</button>
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
        </>
    )
}