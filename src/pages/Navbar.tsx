import React from 'react'
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react'

const Navbar: React.FC = () => {
  return (
    <header className="w-full bg-[#0b0b0b] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold text-white">FitClub</Link>
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/plans" className="text-gray-300 hover:text-white">Plans</Link>
            <Link to="/programs" className="text-gray-300 hover:text-white">Programs</Link>
            <Link to="/products" className="text-gray-300 hover:text-white">Shop</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <button className="px-3 py-1 rounded bg-gradient-to-r from-orange-500 to-red-500 text-white">Login</button>
            </SignInButton>
            <SignUpButton>
              <button className="px-3 py-1 rounded border border-gray-700 text-white">Sign up</button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            {/* built-in avatar + menu */}
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}

export default Navbar










