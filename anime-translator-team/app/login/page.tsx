'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react'
import { loginUser } from '@/data/userData'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const user = loginUser(formData.email, formData.password)
      
      if (user) {
        // Valós alkalmazásban itt JWT token-t tárolnánk
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('isLoggedIn', 'true')
        
        // Admin vagy sima user?
        if (user.role === 'admin') {
          router.push('/admin')
        } else {
          router.push('/')
        }
      } else {
        setError('Hibás email cím vagy jelszó!')
      }
    } catch (err) {
      setError('Hiba történt a bejelentkezés során!')
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
            Bejelentkezés
          </h1>
          <p className="text-anime-textLight">
            Jelentkezz be a fiókodba
          </p>
        </div>

        {/* Login Form */}
        <div className="glass-effect rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-anime-primary/30 text-anime-primary focus:ring-anime-primary/50"
                />
                <span className="ml-2 text-sm text-anime-textLight">
                  Emlékezz rám
                </span>
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-anime-primary hover:text-anime-secondary transition-colors"
              >
                Elfelejtett jelszó?
              </a>
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
                  <User className="w-5 h-5" />
                  <span>Bejelentkezés</span>
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-anime-textLight">
              Még nincs fiókod?{' '}
              <a
                href="/register"
                className="text-anime-primary hover:text-anime-secondary font-medium transition-colors"
              >
                Regisztrálj itt
              </a>
            </p>
          </div>

          {/* Demo Accounts */}
          <div className="mt-6 p-4 bg-anime-neutral/30 rounded-lg">
            <h3 className="text-sm font-medium text-anime-text mb-2">
              Demo fiókok:
            </h3>
            <div className="space-y-1 text-xs text-anime-textLight">
              <p><strong>Admin:</strong> admin@mahoufansub.hu / admin123</p>
              <p><strong>User:</strong> test@example.com / test123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
