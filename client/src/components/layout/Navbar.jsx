import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { categories } from '@/data/mockData';
import { clearUser } from '@/store/slices/authSlice';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Redux selectors
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Refs for dropdown management
  const categoriesRef = useRef(null);
  const userMenuRef = useRef(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setCategoriesOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation for dropdowns
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setCategoriesOpen(false);
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return 'U';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  // Handle logout
  const handleLogout = () => {
    dispatch(clearUser());
    setUserMenuOpen(false);
    navigate('/');
  };

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Books', path: '/books' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Mobile Menu Button - Left */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
          >
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>

          {/* Logo - Left on desktop, Center on mobile */}
          <Link
            to="/"
            className="font-serif text-2xl lg:text-3xl font-bold lg:mr-8 absolute left-1/2 lg:left-auto lg:static transform -translate-x-1/2 lg:transform-none"
          >
            <span className="text-slate-900">Book</span>
            <span className="text-amber-600">Store</span>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center space-x-8 flex-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors pb-1 border-b-2 ${
                    isActive
                      ? 'text-amber-600 border-amber-600'
                      : 'text-slate-700 border-transparent hover:text-amber-600 hover:border-amber-200'
                  }`
                }
                aria-current={location.pathname === link.path ? 'page' : undefined}
              >
                {link.name}
              </NavLink>
            ))}

            {/* Categories Dropdown */}
            <div className="relative" ref={categoriesRef}>
              <button
                type="button"
                className={`flex items-center space-x-1 text-sm font-medium transition-colors pb-1 border-b-2 focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  categoriesOpen
                    ? 'text-amber-600 border-amber-600'
                    : 'text-slate-700 border-transparent hover:text-amber-600 hover:border-amber-200'
                }`}
                onClick={() => setCategoriesOpen(!categoriesOpen)}
                aria-expanded={categoriesOpen}
                aria-haspopup="true"
              >
                <span>Categories</span>
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform ${
                    categoriesOpen ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {/* Categories Dropdown Menu */}
              {categoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-1 gap-1">
                    {categories.slice(0, 8).map((category) => (
                      <Link
                        key={category.id}
                        to={`/books?category=${encodeURIComponent(category.name)}`}
                        className="px-4 py-2.5 hover:bg-amber-50 transition-colors flex items-center justify-between group"
                        onClick={() => setCategoriesOpen(false)}
                      >
                        <span className="text-sm font-medium text-slate-700 group-hover:text-amber-600">
                          {category.name}
                        </span>
                        <span className="text-xs text-slate-500 group-hover:text-amber-500">
                          {category.bookCount}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 mt-2 pt-2 px-4">
                    <Link
                      to="/categories"
                      className="text-sm font-medium text-amber-600 hover:text-amber-700 flex items-center"
                      onClick={() => setCategoriesOpen(false)}
                    >
                      View All Categories
                      <ChevronDownIcon className="w-4 h-4 ml-1 -rotate-90" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search Button */}
            <button
              type="button"
              className="p-2 text-slate-700 hover:bg-gray-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
              onClick={() => navigate('/search')}
              aria-label="Search books"
            >
              <MagnifyingGlassIcon className="w-5 h-5" aria-hidden="true" />
            </button>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-700 hover:bg-gray-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label={`Shopping cart with ${cartItems.length} items`}
            >
              <ShoppingCartIcon className="w-5 h-5" aria-hidden="true" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length > 9 ? '9+' : cartItems.length}
                </span>
              )}
            </Link>

            {/* Auth Buttons / User Menu */}
            {!isAuthenticated ? (
              <div className="hidden lg:flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-700 hover:text-amber-600 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 px-3 py-2 rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-full"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-semibold text-sm">
                    {getUserInitials()}
                  </div>
                  <ChevronDownIcon
                    className={`hidden lg:block w-4 h-4 text-slate-700 transition-transform ${
                      userMenuOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        My Orders
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-amber-600 hover:bg-amber-50 font-medium transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                    </div>
                    <div className="border-t border-gray-200 py-1">
                      <button
                        type="button"
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Auth Icons (when not authenticated) */}
            {!isAuthenticated && (
              <Link
                to="/login"
                className="lg:hidden p-2 text-slate-700 hover:bg-gray-50 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                aria-label="Login"
              >
                <UserCircleIcon className="w-5 h-5" aria-hidden="true" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Menu Panel */}
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 shadow-xl lg:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <Link
                to="/"
                className="font-serif text-2xl font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-slate-900">Book</span>
                <span className="text-amber-600">Store</span>
              </Link>
              <button
                type="button"
                className="p-2 rounded-md text-slate-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <XMarkIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="py-4">
              {/* User Info (if authenticated) */}
              {isAuthenticated && user && (
                <div className="px-4 py-3 mb-4 bg-amber-50 border-l-4 border-amber-600">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-600 truncate">{user.email}</p>
                </div>
              )}

              {/* Navigation Links */}
              <div className="space-y-1 px-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-amber-50 text-amber-600'
                          : 'text-slate-700 hover:bg-gray-50 hover:text-amber-600'
                      }`
                    }
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}

                {/* Categories Section */}
                <div className="pt-2">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full px-4 py-3 text-base font-medium text-slate-700 hover:bg-gray-50 hover:text-amber-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
                    onClick={() => setCategoriesOpen(!categoriesOpen)}
                    aria-expanded={categoriesOpen}
                  >
                    <span>Categories</span>
                    <ChevronDownIcon
                      className={`w-5 h-5 transition-transform ${
                        categoriesOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Mobile Categories List */}
                  {categoriesOpen && (
                    <div className="mt-2 space-y-1 pl-4">
                      {categories.slice(0, 8).map((category) => (
                        <Link
                          key={category.id}
                          to={`/books?category=${encodeURIComponent(category.name)}`}
                          className="block px-4 py-2 text-sm text-slate-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {category.name}
                          <span className="text-xs text-slate-400 ml-2">
                            ({category.bookCount})
                          </span>
                        </Link>
                      ))}
                      <Link
                        to="/categories"
                        className="block px-4 py-2 text-sm font-medium text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        View All Categories →
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile Menu Actions */}
              <div className="mt-6 px-4 space-y-3 border-t border-gray-200 pt-6">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-center text-sm font-medium text-slate-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-3 text-center text-sm font-medium text-slate-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-3 text-center text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-500 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      type="button"
                      className="block w-full px-4 py-3 text-center text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-center text-sm font-medium text-slate-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-3 text-center text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-500 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
