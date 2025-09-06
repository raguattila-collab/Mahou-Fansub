'use client'

import { Star, Calendar, Play, Download, BookOpen } from 'lucide-react'
import Image from 'next/image'

interface Content {
  id: number
  title: string
  originalTitle: string
  image: string
  rating: number
  year: number
  genres: string[]
  status: string
  episodes?: number
  chapters?: number
  description: string
  type: 'anime' | 'manga'
  downloadLinks: {
    quality: string
    size: string
    link: string
  }[]
}

interface AnimeCardProps {
  anime: Content
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <div className="anime-card rounded-xl overflow-hidden group cursor-pointer">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={anime.image}
          alt={anime.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            anime.status === 'Befejezve' 
              ? 'bg-green-500 text-white' 
              : anime.status === 'Folyamatban'
              ? 'bg-yellow-500 text-white'
              : 'bg-blue-500 text-white'
          }`}>
            {anime.status}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-3 left-3 flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-white text-sm font-medium">{anime.rating}</span>
        </div>

        {/* Play/Read Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            {anime.type === 'anime' ? (
              <Play className="w-8 h-8 text-white" />
            ) : (
              <BookOpen className="w-8 h-8 text-white" />
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-bold text-anime-text text-lg line-clamp-1">
            {anime.title}
          </h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            anime.type === 'anime' 
              ? 'bg-anime-primary text-white' 
              : 'bg-anime-secondary text-white'
          }`}>
            {anime.type === 'anime' ? 'Anime' : 'Manga'}
          </span>
        </div>
        <p className="text-anime-textLight text-sm mb-2 line-clamp-1">
          {anime.originalTitle}
        </p>
        
        <div className="flex items-center justify-between text-sm text-anime-textLight mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{anime.year}</span>
          </div>
          <span>
            {anime.type === 'anime' 
              ? `${anime.episodes} epizód` 
              : `${anime.chapters} fejezet`
            }
          </span>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {anime.genres.slice(0, 2).map((genre, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-anime-primary/20 text-anime-primary text-xs rounded-full"
            >
              {genre}
            </span>
          ))}
          {anime.genres.length > 2 && (
            <span className="px-2 py-1 bg-anime-neutral/50 text-anime-textLight text-xs rounded-full">
              +{anime.genres.length - 2}
            </span>
          )}
        </div>

        {/* Download Button */}
        <button className="w-full btn-primary text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:scale-105 transition-transform">
          <Download className="w-4 h-4" />
          <span>Letöltés</span>
        </button>
      </div>
    </div>
  )
}
