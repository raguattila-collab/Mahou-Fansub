export interface User {
  id: number
  username: string
  email: string
  password: string // Valós alkalmazásban hash-elt jelszó
  firstName: string
  lastName: string
  avatar?: string
  role: 'admin' | 'moderator' | 'editor' | 'translator' | 'user'
  joinDate: string
  lastLogin?: string
  isActive: boolean
  permissions: {
    canManageContent: boolean
    canManageUsers: boolean
    canManageTeam: boolean
    canAccessAdmin: boolean
    canEditContent: boolean
    canDeleteContent: boolean
    canUploadFiles: boolean
    canModerateComments: boolean
  }
  preferences: {
    favoriteGenres: string[]
    notifications: {
      email: boolean
      newEpisodes: boolean
      teamUpdates: boolean
    }
  }
  stats: {
    downloads: number
    favorites: number
    comments: number
  }
}

export const userData: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@mahoufansub.hu',
    password: 'admin123', // Valós alkalmazásban hash-elt jelszó
    firstName: 'Admin',
    lastName: 'User',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'admin',
    joinDate: '2020-01-15',
    lastLogin: '2024-01-15T10:30:00Z',
    isActive: true,
    permissions: {
      canManageContent: true,
      canManageUsers: true,
      canManageTeam: true,
      canAccessAdmin: true,
      canEditContent: true,
      canDeleteContent: true,
      canUploadFiles: true,
      canModerateComments: true
    },
    preferences: {
      favoriteGenres: ['Akció', 'Fantasy', 'Drama'],
      notifications: {
        email: true,
        newEpisodes: true,
        teamUpdates: true
      }
    },
    stats: {
      downloads: 150,
      favorites: 25,
      comments: 45
    }
  },
  {
    id: 2,
    username: 'testuser',
    email: 'test@example.com',
    password: 'test123',
    firstName: 'Test',
    lastName: 'User',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'user',
    joinDate: '2024-01-10',
    lastLogin: '2024-01-14T15:20:00Z',
    isActive: true,
    permissions: {
      canManageContent: false,
      canManageUsers: false,
      canManageTeam: false,
      canAccessAdmin: false,
      canEditContent: false,
      canDeleteContent: false,
      canUploadFiles: false,
      canModerateComments: false
    },
    preferences: {
      favoriteGenres: ['Romantikus', 'Komedi'],
      notifications: {
        email: true,
        newEpisodes: false,
        teamUpdates: true
      }
    },
    stats: {
      downloads: 25,
      favorites: 8,
      comments: 12
    }
  }
]

// Egyszerű bejelentkezési funkciók (valós alkalmazásban backend API-t használnánk)
export const loginUser = (email: string, password: string): User | null => {
  const user = userData.find(u => u.email === email && u.password === password && u.isActive)
  if (user) {
    user.lastLogin = new Date().toISOString()
    return user
  }
  return null
}

export const registerUser = (userData: Omit<User, 'id' | 'joinDate' | 'lastLogin' | 'stats'>): User => {
  const newUser: User = {
    ...userData,
    id: Math.max(...userData.map(u => u.id)) + 1,
    joinDate: new Date().toISOString(),
    stats: {
      downloads: 0,
      favorites: 0,
      comments: 0
    }
  }
  userData.push(newUser)
  return newUser
}

export const getUserById = (id: number): User | null => {
  return userData.find(u => u.id === id) || null
}

// Jogosultság kezelő funkciók
export const hasPermission = (user: User, permission: keyof User['permissions']): boolean => {
  return user.permissions[permission]
}

export const canAccessAdmin = (user: User): boolean => {
  return hasPermission(user, 'canAccessAdmin')
}

export const canManageContent = (user: User): boolean => {
  return hasPermission(user, 'canManageContent')
}

export const canUploadFiles = (user: User): boolean => {
  return hasPermission(user, 'canUploadFiles')
}

// Szerepkör alapú jogosultság beállítás
export const getPermissionsByRole = (role: User['role']): User['permissions'] => {
  switch (role) {
    case 'admin':
      return {
        canManageContent: true,
        canManageUsers: true,
        canManageTeam: true,
        canAccessAdmin: true,
        canEditContent: true,
        canDeleteContent: true,
        canUploadFiles: true,
        canModerateComments: true
      }
    case 'moderator':
      return {
        canManageContent: true,
        canManageUsers: false,
        canManageTeam: false,
        canAccessAdmin: true,
        canEditContent: true,
        canDeleteContent: false,
        canUploadFiles: true,
        canModerateComments: true
      }
    case 'editor':
      return {
        canManageContent: true,
        canManageUsers: false,
        canManageTeam: false,
        canAccessAdmin: false,
        canEditContent: true,
        canDeleteContent: false,
        canUploadFiles: true,
        canModerateComments: false
      }
    case 'translator':
      return {
        canManageContent: false,
        canManageUsers: false,
        canManageTeam: false,
        canAccessAdmin: false,
        canEditContent: false,
        canDeleteContent: false,
        canUploadFiles: true,
        canModerateComments: false
      }
    case 'user':
    default:
      return {
        canManageContent: false,
        canManageUsers: false,
        canManageTeam: false,
        canAccessAdmin: false,
        canEditContent: false,
        canDeleteContent: false,
        canUploadFiles: false,
        canModerateComments: false
      }
  }
}
