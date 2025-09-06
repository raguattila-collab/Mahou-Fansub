'use client'

import { useState } from 'react'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Szimulált email küldés (valós alkalmazásban itt API hívás lenne)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Itt ellenőriznénk, hogy létezik-e a felhasználó
      if (email === 'admin@mahoufansub.hu' || email === 'test@example.com') {
        setIsSubmitted(true)
      } else {
        setError('Ez az email cím nem található a rendszerben.')
      }
    } catch (err) {
      setError('Hiba történt a jelszó helyreállítás során.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-anime-light to-anime-neutral flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="glass-effect rounded-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-anime-text mb-4">
              Email elküldve!
            </h1>
            
            <p className="text-anime-textLight mb-6">
              Ha ez az email cím regisztrálva van a rendszerben, akkor hamarosan megkapod a jelszó helyreállítási linket.
            </p>
            
            <div className="space-y-4">
              <a
                href="/login"
                className="btn-primary text-white px-6 py-2 rounded-lg font-medium inline-block"
              >
                Vissza a bejelentkezéshez
              </a>
              
              <p className="text-sm text-anime-textLight">
                Nem kaptad meg az emailt? Ellenőrizd a spam mappát vagy{' '}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-anime-primary hover:text-anime-secondary transition-colors"
                >
                  próbáld újra
                </button>
              </p>
            </div>
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
            Elfelejtett jelszó
          </h1>
          <p className="text-anime-textLight">
            Add meg az email címed, és küldünk egy jelszó helyreállítási linket
          </p>
        </div>

        {/* Form */}
        <div className="glass-effect rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-anime-text font-medium mb-2">
                Email cím
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-anime-textLight w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 focus:border-anime-primary text-anime-text"
                  placeholder="pelda@email.com"
                  required
                />
              </div>
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
                  <Mail className="w-5 h-5" />
                  <span>Jelszó helyreállítási link küldése</span>
                </>
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <a
              href="/login"
              className="inline-flex items-center space-x-2 text-anime-text hover:text-anime-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Vissza a bejelentkezéshez</span>
            </a>
          </div>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-anime-neutral/30 rounded-lg">
            <h3 className="text-sm font-medium text-anime-text mb-2">
              Demo fiókok:
            </h3>
            <div className="space-y-1 text-xs text-anime-textLight">
              <p><strong>Admin:</strong> admin@mahoufansub.hu</p>
              <p><strong>User:</strong> test@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
