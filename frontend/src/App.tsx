import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import MyOrders from './pages/MyOrders';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/MyOrders" element={<MyOrders />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
