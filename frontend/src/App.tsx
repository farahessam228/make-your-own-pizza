import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from '../pages/SignUpPage'
import ProfilePage from '../pages/ProfilePage'


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  )
} 1 