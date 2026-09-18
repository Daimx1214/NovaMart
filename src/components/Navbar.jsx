import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";

function Navbar() {
  const { currentUser, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/");
    setMobileMenuOpen(false);
  }

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? "text-brand-600 font-semibold" : "text-ink-600 hover:text-brand-600"
    }`;

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-ink-200/80 sticky top-0 z-40 transition-all">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <Logo size="md" />

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={linkClass}>
            Shop
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact Us
          </NavLink>
          <NavLink to="/faq" className={linkClass}>
            FAQ
          </NavLink>

          {!isAdmin && (
            <>
              <NavLink to="/cart" className="relative text-ink-600 hover:text-brand-600 transition-colors p-1">
                <svg className="w-6 h-6 text-ink-700 hover:text-brand-600 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-brand-600 text-white text-[11px] font-bold rounded-full h-5 min-w-5 px-1 flex items-center justify-center shadow-xs animate-pulse">
                    {cartCount}
                  </span>
                )}
              </NavLink>

              {isAuthenticated && (
                <NavLink to="/orders" className={linkClass}>
                  My Orders
                </NavLink>
              )}
            </>
          )}

          {isAuthenticated ? (
            <div className="flex items-center gap-3 pl-2 border-l border-ink-200">
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className="rounded-lg bg-amber-50 text-amber-800 border border-amber-200/60 px-3 py-1.5 text-xs font-semibold hover:bg-amber-100 transition-colors"
                >
                  Admin Dashboard
                </NavLink>
              )}
              <div className="text-right">
                <span className="block text-xs font-semibold text-ink-700">
                  {typeof currentUser?.name === "string" && currentUser.name.trim()
                    ? currentUser.name.trim().split(" ")[0]
                    : currentUser?.email
                    ? currentUser.email.split("@")[0]
                    : "User"}
                </span>
                <span className="block text-[10px] text-ink-400 capitalize">{currentUser?.role || "user"}</span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-lg bg-ink-100 px-3 py-1.5 text-xs font-medium text-ink-700 hover:bg-ink-200 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 pl-2 border-l border-ink-200">
              <Link to="/login" className="text-sm font-medium text-ink-700 hover:text-brand-600 transition-colors">
                Log in
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-brand-600 text-white text-sm font-semibold px-4 py-2 hover:bg-brand-700 transition-colors shadow-xs"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-ink-600 hover:bg-ink-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-ink-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-ink-700 font-medium border-b border-ink-100">
            Shop Catalog
          </NavLink>
          <NavLink to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-ink-700 font-medium border-b border-ink-100">
            About Us
          </NavLink>
          <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-ink-700 font-medium border-b border-ink-100">
            Contact Us
          </NavLink>
          <NavLink to="/faq" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-ink-700 font-medium border-b border-ink-100">
            Help & FAQ
          </NavLink>

          {!isAdmin && (
            <>
              <NavLink to="/cart" onClick={() => setMobileMenuOpen(false)} className="flex items-center justify-between py-2 text-ink-700 font-medium border-b border-ink-100">
                <span>Your Cart</span>
                <span className="bg-brand-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
              </NavLink>
              {isAuthenticated && (
                <NavLink to="/orders" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-ink-700 font-medium border-b border-ink-100">
                  My Orders
                </NavLink>
              )}
            </>
          )}

          {isAuthenticated ? (
            <div className="pt-2 space-y-2">
              {isAdmin && (
                <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)} className="block text-center py-2 bg-amber-50 text-amber-800 font-medium rounded-lg text-sm border border-amber-200/60">
                  Admin Dashboard
                </NavLink>
              )}
              <button onClick={handleLogout} className="w-full text-center py-2 bg-ink-100 text-ink-700 font-medium rounded-lg text-sm">
                Log out
              </button>
            </div>
          ) : (
            <div className="pt-2 grid grid-cols-2 gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 bg-ink-100 text-ink-700 font-medium rounded-lg text-sm">
                Log in
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 bg-brand-600 text-white font-medium rounded-lg text-sm">
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
