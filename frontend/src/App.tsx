import { Navigate, Route, Routes } from 'react-router-dom'
import SignUpPage from '../pages/SignUpPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  )
} 1 