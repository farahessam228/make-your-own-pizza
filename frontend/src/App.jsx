import { Navigate, Route, Routes } from 'react-router-dom'

import AuthLayout from './components/layout/AuthLayout'
import CustomerLayout from './components/layout/CustomerLayout'
import ManagerLayout from './components/layout/ManagerLayout'
import DeliveryLayout from './components/layout/DeliveryLayout'

import SignIn from './pages/auth/SignIn'
import SignUp from './pages/auth/SignUp'
import ForgotPassword from './pages/auth/ForgotPassword'
import VerifyOtp from './pages/auth/VerifyOtp'
import NewPassword from './pages/auth/NewPassword'

import Builder from './pages/customer/Builder'
import Cart from './pages/customer/Cart'
import Checkout from './pages/customer/Checkout'
import Payment from './pages/customer/Payment'
import OrderConfirmation from './pages/customer/OrderConfirmation'
import Orders from './pages/customer/Orders'
import OrderDetails from './pages/customer/OrderDetails'
import Track from './pages/customer/Track'
import Settings from './pages/customer/Settings'

import ManagerOrders from './pages/manager/ManagerOrders'
import ManagerOrderDetails from './pages/manager/ManagerOrderDetails'

import Deliveries from './pages/delivery/Deliveries'
import DeliveryDetails from './pages/delivery/DeliveryDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/new-password" element={<NewPassword />} />
      </Route>

      <Route path="/customer" element={<CustomerLayout />}>
        <Route index element={<Navigate to="builder" replace />} />
        <Route path="builder" element={<Builder />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment" element={<Payment />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:orderId" element={<OrderDetails />} />
        <Route path="track/:orderId" element={<Track />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="/manager" element={<ManagerLayout />}>
        <Route index element={<Navigate to="orders" replace />} />
        <Route path="orders" element={<ManagerOrders />} />
        <Route path="orders/:orderId" element={<ManagerOrderDetails />} />
      </Route>

      <Route path="/delivery" element={<DeliveryLayout />}>
        <Route index element={<Navigate to="deliveries" replace />} />
        <Route path="deliveries" element={<Deliveries />} />
        <Route path="deliveries/:orderId" element={<DeliveryDetails />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
