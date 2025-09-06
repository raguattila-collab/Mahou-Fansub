'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Calendar, Download, Heart, MessageCircle, Settings, Edit, Save, X } from 'lucide-react'
import { getUserById } from '@/data/userData'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: ''
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setEditData({
        firstName: parsedUser.firstName,
        lastName: parsedUser.lastName,
        email: parsedUser.email,
        username: parsedUser.username
      })
    } else {
      router.push('/login')
    }
  }, [router])

  const handleSave = () => {
    const updatedUser = { ...user, ...editData }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username
    })
    setIsEditing(false)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-anime-light to-anime-neutral flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-anime-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-anime-textLight">Betöltés...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-anime-light to-anime-neutral py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-anime-text mb-2">
            Felhasználói Profil
          </h1>
          <p className="text-anime-textLight">
            Kezeld a profilodat és beállításaidat
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-xl p-6 text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 bg-anime-primary rounded-full flex items-center justify-center mx-auto">
                  <User className="w-12 h-12 text-white" />
                </div>
                {user.role === 'admin' && (
                  <div className="absolute -top-2 -right-2 bg-anime-secondary text-white rounded-full p-1">
                    <Settings className="w-4 h-4" />
                  </div>
                )}
              </div>
              
              <h2 className="text-2xl font-bold text-anime-text mb-1">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-anime-primary font-medium mb-2">
                @{user.username}
              </p>
              <p className="text-anime-textLight text-sm mb-4">
                {user.role === 'admin' ? 'Adminisztrátor' : 'Felhasználó'}
              </p>
              
              <div className="space-y-2 text-sm text-anime-textLight">
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Csatlakozott: {new Date(user.joinDate).toLocaleDateString('hu-HU')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-anime-text">
                  Profil Adatok
                </h3>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center space-x-2 text-anime-primary hover:text-anime-secondary transition-colors"
                >
                  {isEditing ? <X className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
                  <span>{isEditing ? 'Mégse' : 'Szerkesztés'}</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-anime-text font-medium mb-2">
                      Keresztnév
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.firstName}
                        onChange={(e) => setEditData({...editData, firstName: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 text-anime-text"
                      />
                    ) : (
                      <p className="text-anime-textLight">{user.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-anime-text font-medium mb-2">
                      Vezetéknév
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.lastName}
                        onChange={(e) => setEditData({...editData, lastName: e.target.value})}
                        className="w-full px-4 py-2 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 text-anime-text"
                      />
                    ) : (
                      <p className="text-anime-textLight">{user.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-anime-text font-medium mb-2">
                    Email cím
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({...editData, email: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 text-anime-text"
                    />
                  ) : (
                    <p className="text-anime-textLight">{user.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-anime-text font-medium mb-2">
                    Felhasználónév
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.username}
                      onChange={(e) => setEditData({...editData, username: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 text-anime-text"
                    />
                  ) : (
                    <p className="text-anime-textLight">@{user.username}</p>
                  )}
                </div>

                {isEditing && (
                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleSave}
                      className="btn-primary text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Mentés</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2 border border-anime-primary/30 text-anime-text rounded-lg hover:bg-anime-primary/10 transition-colors"
                    >
                      Mégse
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="glass-effect rounded-xl p-6 mt-6">
              <h3 className="text-2xl font-bold text-anime-text mb-6">
                Statisztikák
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-anime-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Download className="w-6 h-6 text-anime-primary" />
                  </div>
                  <div className="text-2xl font-bold text-anime-text">{user.stats.downloads}</div>
                  <div className="text-anime-textLight">Letöltés</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-anime-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-anime-secondary" />
                  </div>
                  <div className="text-2xl font-bold text-anime-text">{user.stats.favorites}</div>
                  <div className="text-anime-textLight">Kedvenc</div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-anime-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MessageCircle className="w-6 h-6 text-anime-accent" />
                  </div>
                  <div className="text-2xl font-bold text-anime-text">{user.stats.comments}</div>
                  <div className="text-anime-textLight">Hozzászólás</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
