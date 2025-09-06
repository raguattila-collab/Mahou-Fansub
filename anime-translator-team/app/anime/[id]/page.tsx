'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Star, Calendar, Play, Download, BookOpen, ArrowLeft, Heart, Share2 } from 'lucide-react'
import { contentData, Content } from '@/data/animeData'
import Image from 'next/image'

export default function AnimeDetailPage() {
  const params = useParams()
  const [anime, setAnime] = useState<Content | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedQuality, setSelectedQuality] = useState('')

  useEffect(() => {
    const animeId = parseInt(params.id as string)
    const foundAnime = contentData.find(item => item.id === animeId)
    setAnime(foundAnime || null)
    setIsLoading(false)
  }, [params.id])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-anime-light to-anime-neutral flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-anime-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-anime-textLight">Betöltés...</p>
        </div>
      </div>
    )
  }

  if (!anime) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-anime-light to-anime-neutral flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-anime-text mb-4">Anime nem található</h1>
          <a href="/" className="btn-primary text-white px-6 py-2 rounded-lg">
            Vissza a főoldalra
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-anime-light to-anime-neutral">
      {/* Back Button */}
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <a
            href="/"
            className="inline-flex items-center space-x-2 text-anime-text hover:text-anime-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Vissza a főoldalra</span>
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <div className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image */}
            <div className="lg:col-span-1">
              <div className="relative">
                <Image
                  src={anime.image}
                  alt={anime.title}
                  width={400}
                  height={600}
                  className="w-full h-96 lg:h-[600px] object-cover rounded-xl shadow-lg"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    anime.status === 'Befejezve' 
                      ? 'bg-green-500 text-white' 
                      : anime.status === 'Folyamatban'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}>
                    {anime.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-2">
              <div className="glass-effect rounded-xl p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-anime-text mb-2">
                      {anime.title}
                    </h1>
                    <p className="text-xl text-anime-textLight mb-4">
                      {anime.originalTitle}
                    </p>
                    <div className="flex items-center space-x-4 text-anime-textLight">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{anime.year}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{anime.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {anime.type === 'anime' ? (
                          <Play className="w-4 h-4" />
                        ) : (
                          <BookOpen className="w-4 h-4" />
                        )}
                        <span>
                          {anime.type === 'anime' 
                            ? `${anime.episodes} epizód` 
                            : `${anime.chapters} fejezet`
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="p-2 bg-anime-primary/20 text-anime-primary rounded-lg hover:bg-anime-primary/30 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                    <button className="p-2 bg-anime-primary/20 text-anime-primary rounded-lg hover:bg-anime-primary/30 transition-colors">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Genres */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-anime-text mb-3">Műfajok</h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-anime-primary/20 text-anime-primary text-sm rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-anime-text mb-3">Leírás</h3>
                  <p className="text-anime-textLight leading-relaxed">
                    {anime.description}
                  </p>
                </div>

                {/* Download Section */}
                <div>
                  <h3 className="text-lg font-semibold text-anime-text mb-4">Letöltési lehetőségek</h3>
                  <div className="space-y-3">
                    {anime.downloadLinks.map((link, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                          selectedQuality === link.quality
                            ? 'border-anime-primary bg-anime-primary/10'
                            : 'border-anime-primary/30 hover:border-anime-primary/50'
                        }`}
                        onClick={() => setSelectedQuality(link.quality)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            selectedQuality === link.quality
                              ? 'border-anime-primary bg-anime-primary'
                              : 'border-anime-primary/50'
                          }`} />
                          <div>
                            <div className="font-medium text-anime-text">{link.quality}</div>
                            <div className="text-sm text-anime-textLight">{link.size}</div>
                          </div>
                        </div>
                        <button
                          className="btn-primary text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:scale-105 transition-transform"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Itt lenne a valós letöltési logika
                            alert(`Letöltés: ${anime.title} - ${link.quality}`)
                          }}
                        >
                          <Download className="w-4 h-4" />
                          <span>Letöltés</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
