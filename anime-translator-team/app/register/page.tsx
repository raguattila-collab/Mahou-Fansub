'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, User, UserCheck } from 'lucide-react'
import { registerUser, getPermissionsByRole } from '@/data/userData'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validációk
    if (formData.password !== formData.confirmPassword) {
      setError('A jelszavak nem egyeznek!')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('A jelszó legalább 6 karakter hosszú legyen!')
      setIsLoading(false)
      return
    }

    try {
      const newUser = registerUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: 'user',
        isActive: true,
        permissions: getPermissionsByRole('user'),
        preferences: {
          favoriteGenres: [],
          notifications: {
            email: true,
            newEpisodes: true,
            teamUpdates: true
          }
        }
      })

      // Valós alkalmazásban itt JWT token-t tárolnánk
      localStorage.setItem('user', JSON.stringify(newUser))
      localStorage.setItem('isLoggedIn', 'true')
      
      router.push('/')
    } catch (err) {
      setError('Hiba történt a regisztráció során!')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-anime-light to-anime-neutral flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-anime-primary to-anime-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold text-anime-text">Mahou Fansub</span>
          </div>
          <h1 className="text-3xl font-bold text-anime-text mb-2">
            Regisztráció
          </h1>
          <p className="text-anime-textLight">
            Hozz létre egy új fiókot
          </p>
        </div>

        {/* Register Form */}
        <div className="glass-effect rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-anime-text font-medium mb-2">
                  Keresztnév
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 focus:border-anime-primary text-anime-text"
                  placeholder="Keresztnév"
                  required
                />
              </div>
              <div>
                <label className="block text-anime-text font-medium mb-2">
                  Vezetéknév
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 focus:border-anime-primary text-anime-text"
                  placeholder="Vezetéknév"
                  required
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-anime-text font-medium mb-2">
                Felhasználónév
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-anime-textLight w-5 h-5" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 focus:border-anime-primary text-anime-text"
                  placeholder="felhasznalonev"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-anime-text font-medium mb-2">
                Email cím
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-anime-textLight w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 focus:border-anime-primary text-anime-text"
                  placeholder="pelda@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-anime-text font-medium mb-2">
                Jelszó
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-anime-textLight w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 focus:border-anime-primary text-anime-text"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-anime-textLight hover:text-anime-text"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-anime-text font-medium mb-2">
                Jelszó megerősítése
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-anime-textLight w-5 h-5" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 focus:border-anime-primary text-anime-text"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-anime-textLight hover:text-anime-text"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                className="mt-1 rounded border-anime-primary/30 text-anime-primary focus:ring-anime-primary/50"
                required
              />
              <label className="ml-2 text-sm text-anime-textLight">
                Elfogadom a{' '}
                <a href="/terms" className="text-anime-primary hover:text-anime-secondary">
                  felhasználási feltételeket
                </a>{' '}
                és a{' '}
                <a href="/privacy" className="text-anime-primary hover:text-anime-secondary">
                  adatvédelmi szabályzatot
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserCheck className="w-5 h-5" />
                  <span>Regisztráció</span>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-anime-textLight">
              Már van fiókod?{' '}
              <a
                href="/login"
                className="text-anime-primary hover:text-anime-secondary font-medium transition-colors"
              >
                Jelentkezz be itt
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
