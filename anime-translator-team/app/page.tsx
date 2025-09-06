'use client'

import { useState, useEffect } from 'react'
import { Search, Star, Download, Calendar, Users, Play } from 'lucide-react'
import AnimeCard from '@/components/AnimeCard'
import Header from '@/components/Header'
import FilterBar from '@/components/FilterBar'
import { contentData } from '@/data/animeData'

export default function Home() {
  const [contents, setContents] = useState(contentData)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedType, setSelectedType] = useState('Minden')

  const genres = ['Minden', 'Akció', 'Romantikus', 'Kaland', 'Komedi', 'Drama', 'Fantasy', 'Sci-Fi', 'Thriller']
  const statuses = ['Minden', 'Folyamatban', 'Befejezve', 'Tervezett']
  const types = ['Minden', 'Anime', 'Manga']

  useEffect(() => {
    let filtered = contentData

    if (searchTerm) {
      filtered = filtered.filter(content =>
        content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        content.originalTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedGenre && selectedGenre !== 'Minden') {
      filtered = filtered.filter(content => content.genres.includes(selectedGenre))
    }

    if (selectedStatus && selectedStatus !== 'Minden') {
      filtered = filtered.filter(content => content.status === selectedStatus)
    }

    if (selectedType && selectedType !== 'Minden') {
      filtered = filtered.filter(content => content.type === selectedType.toLowerCase())
    }

    setContents(filtered)
  }, [searchTerm, selectedGenre, selectedStatus, selectedType])

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-anime-text mb-6 drop-shadow-lg">
            Mahou Fansub
          </h1>
          <p className="text-xl text-anime-textLight mb-8 drop-shadow-md">
            A legjobb anime tartalmak magyarul - Minőségi fordítás, gyors megosztás
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-anime-textLight w-5 h-5" />
              <input
                type="text"
                placeholder="Keresés anime címe szerint..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-4 pl-12 pr-4 rounded-full search-input focus:outline-none focus:ring-2 focus:ring-anime-primary"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="glass-effect rounded-lg p-6">
              <Play className="w-8 h-8 text-anime-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-anime-text">{contentData.filter(c => c.type === 'anime').length}</div>
              <div className="text-anime-textLight">Anime</div>
            </div>
            <div className="glass-effect rounded-lg p-6">
              <Users className="w-8 h-8 text-anime-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-anime-text">{contentData.filter(c => c.type === 'manga').length}</div>
              <div className="text-anime-textLight">Manga</div>
            </div>
            <div className="glass-effect rounded-lg p-6">
              <Download className="w-8 h-8 text-anime-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-anime-text">1000+</div>
              <div className="text-anime-textLight">Letöltés</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <FilterBar
        genres={genres}
        statuses={statuses}
        types={types}
        selectedGenre={selectedGenre}
        selectedStatus={selectedStatus}
        selectedType={selectedType}
        onGenreChange={setSelectedGenre}
        onStatusChange={setSelectedStatus}
        onTypeChange={setSelectedType}
      />

      {/* Anime Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-anime-text">
              Tartalom Katalógus
            </h2>
            <div className="text-anime-textLight">
              {contents.length} találat
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {contents.map((content) => (
              <AnimeCard key={content.id} anime={content} />
            ))}
          </div>
          
          {contents.length === 0 && (
            <div className="text-center py-12">
              <div className="text-anime-textLight text-lg">
                Nincs találat a keresési feltételeknek megfelelően
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
