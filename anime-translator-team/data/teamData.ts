export interface TeamMember {
  id: number
  name: string
  role: string
  description: string
  avatar: string
  joinDate: string
  specialties: string[]
  socialLinks: {
    discord?: string
    email?: string
    github?: string
  }
  isActive: boolean
  isAdmin: boolean
}

export const teamData: TeamMember[] = [
  {
    id: 1,
    name: "Admin User",
    role: "Projektvezető",
    description: "A Mahou Fansub alapítója és vezetője. Felelős a projekt irányításáért és a minőség ellenőrzéséért.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    joinDate: "2020-01-15",
    specialties: ["Projektmenedzsment", "Minőségbiztosítás", "Koordináció"],
    socialLinks: {
      discord: "admin#1234",
      email: "admin@mahoufansub.hu"
    },
    isActive: true,
    isAdmin: true
  },
  {
    id: 2,
    name: "Fordító Példa",
    role: "Főfordító",
    description: "Tapasztalt fordító, aki több mint 50 anime és manga fordítását végezte el. Specializálódott a romantikus és drámai műfajokra.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    joinDate: "2020-03-20",
    specialties: ["Japán-Magyar fordítás", "Romantikus műfaj", "Drama"],
    socialLinks: {
      discord: "fordito#5678",
      email: "fordito@mahoufansub.hu"
    },
    isActive: true,
    isAdmin: false
  },
  {
    id: 3,
    name: "Szerkesztő János",
    role: "Szerkesztő",
    description: "Kreatív szerkesztő, aki a szinkronizálásért és a szöveg finomhangolásáért felelős. Minden részletre odafigyel.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    joinDate: "2020-05-10",
    specialties: ["Szinkronizálás", "Szöveg szerkesztés", "Minőség ellenőrzés"],
    socialLinks: {
      discord: "szerkeszto#9012",
      email: "szerkeszto@mahoufansub.hu"
    },
    isActive: true,
    isAdmin: false
  },
  {
    id: 4,
    name: "Technikus Anna",
    role: "Technikai koordinátor",
    description: "A technikai háttér mestere. Felelős a videó feldolgozásért, a kódolásért és a minőség optimalizálásáért.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    joinDate: "2020-07-15",
    specialties: ["Videó feldolgozás", "Kódolás", "Minőség optimalizálás"],
    socialLinks: {
      discord: "technikus#3456",
      email: "technikus@mahoufansub.hu"
    },
    isActive: true,
    isAdmin: false
  },
  {
    id: 5,
    name: "Kreatív Márk",
    role: "Grafikus",
    description: "Kreatív grafikus, aki a csapat vizuális identitásáért és a promóciós anyagokért felelős.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    joinDate: "2020-09-01",
    specialties: ["Grafikai tervezés", "Promóciós anyagok", "Vizuális identitás"],
    socialLinks: {
      discord: "grafikus#7890",
      email: "grafikus@mahoufansub.hu"
    },
    isActive: true,
    isAdmin: false
  }
]
