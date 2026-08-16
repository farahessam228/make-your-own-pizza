import Navbar from "@/components/ui/navbar";

export default function HomePage() {
    return (
        <>
            <Navbar />
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>🍕 Welcome to the Home Page! 🍕</h1>
                <p>You have successfully logged in.</p>
            </div>
        </>
    );
}