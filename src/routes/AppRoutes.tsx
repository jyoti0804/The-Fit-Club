import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/home/Home'
import Plans from '../pages/plans/Plans'
import SignInPage from '../auth/SignInPage'
import SignUpPage from '../auth/SignUpPage'
import Membership from '../pages/membership/Membership'
import ProtectedRoute from './ProtectedRoutes'
import MemberLogin from '../pages/memberLogin/MemberLogin'
import  Products  from '../pages/products/Products'
import LearnMorePage from '../pages/learnMore/LearnMore'
import CartPage from '../store/cartPage'
import Checkout from '../pages/checkout/Checkout'
import MemberList from '../pages/membership/MemberList'
import { Stats } from '../pages/stats/Stats'
import StartWorkout from '../pages/workout/StartWorkout'
import DiscountPage from '../pages/programs/ProgramsDiscount'
import { Classes } from '../pages/classes/GymClass'
import ClassSession from '../pages/classes/ClassSession'
import RenewMembership from '../pages/renew/RenewMembership'
import Profile from '../pages/profile/Profile'
import EditProfile from '../pages/profile/EditProfile'
import Transactions from '../pages/transction/Transactions'
import HelpSupport from '../pages/support/HelpSupport'


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/plans" element={<Plans />} />

      {/* Auth Routes - Centered */}
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      
<Route path="/member-login" element={<MemberLogin />} />
<Route
  path="/membership"
  element={
    <ProtectedRoute>
      <Membership />
    </ProtectedRoute>
  }
/>
<Route
  path="/products"
  element={
    <ProtectedRoute>
      <Products />
    </ProtectedRoute>
  }
/>
 <Route path="/cart" element={
   <ProtectedRoute>
      <CartPage />
    </ProtectedRoute>
 } />
      <Route path="/checkout" element={
        <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
      } />
        <Route path="/memberlist" element={
        <ProtectedRoute>
      <MemberList />
    </ProtectedRoute>
      } />
       <Route path="/stats" element={
        <ProtectedRoute>
      <Stats />
    </ProtectedRoute>
      } />
       <Route path="/workouts" element={
        <ProtectedRoute>
      <StartWorkout />
    </ProtectedRoute>
      } />
       <Route path="/classes" element={
        <ProtectedRoute>
      <Classes />
    </ProtectedRoute>
      } />
        <Route path="/class-session" element={
            <ProtectedRoute>
      <ClassSession />
    </ProtectedRoute>
        } />
         <Route path="/renew" element={
            <ProtectedRoute>
      <RenewMembership />
    </ProtectedRoute>
        } />
          <Route path="/profile" element={
            <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
        } />
        <Route path="/edit-profile" element={
            <ProtectedRoute>
      <EditProfile />
    </ProtectedRoute>
        } />
         <Route path="/transactions" element={
            <ProtectedRoute>
      <Transactions />
    </ProtectedRoute>
        } />
        <Route path="/support" element={
            <ProtectedRoute>
      <HelpSupport />
    </ProtectedRoute>
        } />
       <Route path="/discount/:id" element={<DiscountPage />} />
 <Route path="/learn-more" element={<LearnMorePage />} />
    </Routes>
  )
}










