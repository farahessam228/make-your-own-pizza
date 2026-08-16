import "../../css/navbar.css"
export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="logo">
                Pizzaytak
            </div>
            <ul className="navbar-links">
                <li><a href="http://localhost:5173/home">Home</a></li>
                <li><a href="http://localhost:5173/profile">Profile</a></li>
                <li><a href="http://localhost:5173/MyOrders">My Orders</a></li>
            </ul>
            <button>Logout</button>
        </nav>
    )
}