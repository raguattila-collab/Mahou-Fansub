'use client'

import { useState } from 'react'
import { Eye, EyeOff, Lock, CheckCircle, AlertCircle } from 'lucide-react'

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const validatePassword = (password: string) => {
    const errors: string[] = []
    
    if (password.length < 8) {
      errors.push('A jelszó legalább 8 karakter hosszú legyen')
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('A jelszó tartalmazzon legalább egy nagybetűt')
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('A jelszó tartalmazzon legalább egy kisbetűt')
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push('A jelszó tartalmazzon legalább egy számot')
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('A jelszó tartalmazzon legalább egy speciális karaktert')
    }
    
    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors([])

    const newErrors: string[] = []

    // Jelszó validáció
    const passwordErrors = validatePassword(formData.password)
    newErrors.push(...passwordErrors)

    // Jelszó megerősítés
    if (formData.password !== formData.confirmPassword) {
      newErrors.push('A jelszavak nem egyeznek')
    }

    if (newErrors.length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      // Szimulált jelszó reset (valós alkalmazásban itt API hívás lenne)
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSuccess(true)
    } catch (err) {
      setErrors(['Hiba történt a jelszó frissítése során'])
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

  const getPasswordStrength = (password: string) => {
    const errors = validatePassword(password)
    const strength = 5 - errors.length
    return Math.max(0, strength)
  }

  const getStrengthColor = (strength: number) => {
    if (strength <= 1) return 'bg-red-500'
    if (strength <= 2) return 'bg-orange-500'
    if (strength <= 3) return 'bg-yellow-500'
    if (strength <= 4) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getStrengthText = (strength: number) => {
    if (strength <= 1) return 'Nagyon gyenge'
    if (strength <= 2) return 'Gyenge'
    if (strength <= 3) return 'Közepes'
    if (strength <= 4) return 'Erős'
    return 'Nagyon erős'
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-anime-light to-anime-neutral flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="glass-effect rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-anime-text mb-4">
              Jelszó sikeresen frissítve!
            </h1>
            
            <p className="text-anime-textLight mb-6">
              Az új jelszavad sikeresen be lett állítva. Most már bejelentkezhetsz az új jelszóval.
            </p>
            
            <a
              href="/login"
              className="btn-primary text-white px-6 py-2 rounded-lg font-medium inline-block"
            >
              Bejelentkezés
            </a>
          </div>
        </div>
      </div>
    )
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
            Új jelszó beállítása
          </h1>
          <p className="text-anime-textLight">
            Add meg az új jelszavad
          </p>
        </div>

        {/* Form */}
        <div className="glass-effect rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.length > 0 && (
              <div className="space-y-2">
                {errors.map((error, index) => (
                  <div key={index} className="flex items-center space-x-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                ))}
              </div>
            )}

            {/* New Password */}
            <div>
              <label className="block text-anime-text font-medium mb-2">
                Új jelszó
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
              
              {/* Password Strength */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-anime-textLight">Jelszó erősség:</span>
                    <span className={`text-sm font-medium ${
                      getPasswordStrength(formData.password) <= 2 ? 'text-red-500' :
                      getPasswordStrength(formData.password) <= 3 ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>
                      {getStrengthText(getPasswordStrength(formData.password))}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(getPasswordStrength(formData.password))}`}
                      style={{ width: `${(getPasswordStrength(formData.password) / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
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

            {/* Password Requirements */}
            <div className="bg-anime-neutral/30 rounded-lg p-4">
              <h4 className="text-sm font-medium text-anime-text mb-2">Jelszó követelmények:</h4>
              <ul className="space-y-1 text-xs text-anime-textLight">
                <li className={`flex items-center space-x-2 ${formData.password.length >= 8 ? 'text-green-600' : ''}`}>
                  <CheckCircle className={`w-3 h-3 ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-400'}`} />
                  <span>Legalább 8 karakter</span>
                </li>
                <li className={`flex items-center space-x-2 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : ''}`}>
                  <CheckCircle className={`w-3 h-3 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`} />
                  <span>Legalább egy nagybetű</span>
                </li>
                <li className={`flex items-center space-x-2 ${/[a-z]/.test(formData.password) ? 'text-green-600' : ''}`}>
                  <CheckCircle className={`w-3 h-3 ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`} />
                  <span>Legalább egy kisbetű</span>
                </li>
                <li className={`flex items-center space-x-2 ${/[0-9]/.test(formData.password) ? 'text-green-600' : ''}`}>
                  <CheckCircle className={`w-3 h-3 ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`} />
                  <span>Legalább egy szám</span>
                </li>
                <li className={`flex items-center space-x-2 ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600' : ''}`}>
                  <CheckCircle className={`w-3 h-3 ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600' : 'text-gray-400'}`} />
                  <span>Legalább egy speciális karakter</span>
                </li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Jelszó frissítése</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
