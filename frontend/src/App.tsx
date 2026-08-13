/// <reference types="vite/client" />
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'

export default function App() {
  return (
		<BrowserRouter>
				<Routes>
					<Route path="/" element={<AuthPage />} />
					<Route path="/home" element={<HomePage />} />
					<Route path="/profile" element={<ProfilePage />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
		</BrowserRouter>
  )
}
