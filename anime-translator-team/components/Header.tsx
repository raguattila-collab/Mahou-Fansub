'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Home, Info, Users, Mail, LogIn, User, LogOut, Settings } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    // Ellenőrizzük, hogy be van-e jelentkezve a felhasználó
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true'
    const userData = localStorage.getItem('user')
    
    setIsLoggedIn(loggedIn)
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false)
    setUser(null)
    setShowUserMenu(false)
    // Redirect to home page
    window.location.href = '/'
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-anime-primary to-anime-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-anime-text font-bold text-xl">Mahou Fansub</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-anime-text hover:text-anime-primary transition-colors flex items-center space-x-1">
              <Home className="w-4 h-4" />
              <span>Főoldal</span>
            </a>
            <a href="#anime" className="text-anime-text hover:text-anime-primary transition-colors flex items-center space-x-1">
              <span>Anime</span>
            </a>
            <a href="/about" className="text-anime-text hover:text-anime-primary transition-colors flex items-center space-x-1">
              <Info className="w-4 h-4" />
              <span>Rólunk</span>
            </a>
            <a href="/team" className="text-anime-text hover:text-anime-primary transition-colors flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>Csapat</span>
            </a>
            <a href="/blog" className="text-anime-text hover:text-anime-primary transition-colors flex items-center space-x-1">
              <span>Blog</span>
            </a>
            <a href="/contact" className="text-anime-text hover:text-anime-primary transition-colors flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>Kapcsolat</span>
            </a>
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-anime-text hover:text-anime-primary transition-colors"
                >
                  <div className="w-8 h-8 bg-anime-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span>{user?.firstName || 'Felhasználó'}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 glass-effect rounded-lg py-2 z-50">
                    <a
                      href="/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-anime-text hover:bg-anime-primary/10 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      <span>Profil</span>
                    </a>
                    {user?.role === 'admin' && (
                      <a
                        href="/admin"
                        className="flex items-center space-x-2 px-4 py-2 text-anime-text hover:bg-anime-primary/10 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Admin Panel</span>
                      </a>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-anime-text hover:bg-red-100 w-full text-left transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Kijelentkezés</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <a
                  href="/login"
                  className="text-anime-text hover:text-anime-primary transition-colors flex items-center space-x-1"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Bejelentkezés</span>
                </a>
                <a
                  href="/register"
                  className="btn-primary text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition-transform"
                >
                  Regisztráció
                </a>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-anime-primary transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <nav className="flex flex-col space-y-4">
              <a href="#" className="text-anime-text hover:text-anime-primary transition-colors flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Főoldal</span>
              </a>
              <a href="#anime" className="text-anime-text hover:text-anime-primary transition-colors flex items-center space-x-2">
                <span>Anime</span>
              </a>
              <a href="/about" className="text-anime-text hover:text-anime-primary transition-colors flex items-center space-x-2">
                <Info className="w-4 h-4" />
                <span>Rólunk</span>
              </a>
              <a href="/team" className="text-anime-text hover:text-anime-primary transition-colors flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>Csapat</span>
              </a>
              <a href="/blog" className="text-anime-text hover:text-anime-primary transition-colors flex items-center space-x-2">
                <span>Blog</span>
              </a>
              <a href="/contact" className="text-anime-text hover:text-anime-primary transition-colors flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Kapcsolat</span>
              </a>
              
              {/* Mobile User Menu */}
              <div className="border-t border-anime-primary/20 pt-4">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-anime-text">
                      <User className="w-4 h-4" />
                      <span>{user?.firstName || 'Felhasználó'}</span>
                    </div>
                    <a
                      href="/profile"
                      className="text-anime-textLight hover:text-anime-primary transition-colors flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Profil</span>
                    </a>
                    {user?.role === 'admin' && (
                      <a
                        href="/admin"
                        className="text-anime-textLight hover:text-anime-primary transition-colors flex items-center space-x-2"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Admin Panel</span>
                      </a>
                    )}
                    <button
                      onClick={handleLogout}
                      className="text-anime-textLight hover:text-red-500 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Kijelentkezés</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <a
                      href="/login"
                      className="text-anime-text hover:text-anime-primary transition-colors flex items-center space-x-2"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Bejelentkezés</span>
                    </a>
                    <a
                      href="/register"
                      className="btn-primary text-white px-4 py-2 rounded-lg font-medium inline-flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>Regisztráció</span>
                    </a>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
