import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mahou Fansub - Anime Megosztó Platform',
  description: 'A legjobb anime tartalmak magyarul - Mahou Fansub csapat',
  keywords: 'anime, magyar, fordítás, fansub, Mahou',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body>
        {children}
      </body>
    </html>
  )
}
