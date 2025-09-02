import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ProductList from '../pages/ProductList'
import ProtectedRoute from '../components/ProtectedRoute'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route 
        path="/products" 
        element={
          <ProtectedRoute>
            <ProductList />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/products" replace />} />
    </Routes>
  )
} 