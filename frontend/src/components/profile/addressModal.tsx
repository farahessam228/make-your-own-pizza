import { InfoRow } from "./ProfileDetails";
import { useState } from "react";
import "@/components/profile/adress.css"

export type AddressValues = {
    city: string,
    street: string,
    district: string,
    building_no: string,
    floor_no: string,
    apt_no: string,
}

type ModalProps = AddressValues & {
    onCancel: () => void;
    onSave: (draft: AddressValues) => void;
    onDelete: () => void
}

export default function AddressModal(
    {
        city,
        street,
        district,
        building_no,
        floor_no,
        apt_no,

        onCancel,
        onDelete,
        onSave

    }: ModalProps) {

    const [draft, setDraft] = useState<AddressValues>({
        city,
        street,
        district,
        building_no,
        floor_no,
        apt_no,
    })
    return (
        <div>
            <div className="address-modal-overlay">
                <div className="address-modal">
                    <div className="address-modal-header">
                        <h2>add address modal</h2>
                    </div>
                    <div>
                        <form className="address-modal-body"
                            onSubmit={(e) => {
                                e.preventDefault();
                                onSave(draft);
                            }}
                        >
                            <div className="info-row">
                                <InfoRow
                                    label="City"
                                    value={draft.city}
                                    isEditing={true}
                                    onChange={(v) => setDraft((current) => ({ ...current, city: v }))} />
                                <InfoRow
                                    label="Street"
                                    value={draft.street}
                                    isEditing={true}
                                    onChange={(v) => setDraft((current) => ({ ...current, street: v }))} />
                                <InfoRow
                                    label="District"
                                    value={draft.district}
                                    isEditing={true}
                                    onChange={(v) => setDraft((current) => ({ ...current, district: v }))} />
                                <InfoRow
                                    label="Building No"
                                    value={draft.building_no}
                                    isEditing={true}
                                    onChange={(v) => setDraft((current) => ({ ...current, building_no: v }))} />
                                <InfoRow
                                    label="Floor No"
                                    value={draft.floor_no}
                                    isEditing={true}
                                    readOnly={false}
                                    onChange={(v) => setDraft((current) => ({ ...current, floor_no: v }))} />
                                <InfoRow
                                    label="Apartment No"
                                    value={draft.apt_no}
                                    isEditing={true}
                                    readOnly={false}
                                    onChange={(v) => setDraft((current) => ({ ...current, apt_no: v }))} />
                                <div className="btn-group-small">
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={onCancel}>Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}