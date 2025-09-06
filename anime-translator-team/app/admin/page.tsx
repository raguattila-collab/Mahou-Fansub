'use client'

import { useState } from 'react'
import { Upload, Save, X, Plus, Edit, Trash2, Eye } from 'lucide-react'
import { animeData, Anime } from '@/data/animeData'

export default function AdminPage() {
  const [animes, setAnimes] = useState<Anime[]>(animeData)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [editingAnime, setEditingAnime] = useState<Anime | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    originalTitle: '',
    image: '',
    rating: 0,
    year: new Date().getFullYear(),
    genres: [] as string[],
    status: 'Tervezett',
    episodes: 1,
    description: '',
    downloadLinks: [{ quality: '1080p', size: '', link: '' }]
  })

  const availableGenres = ['Akció', 'Romantikus', 'Kaland', 'Komedi', 'Drama', 'Fantasy', 'Sci-Fi', 'Thriller', 'Horror', 'Mystery']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingAnime) {
      // Szerkesztés
      setAnimes(animes.map(anime => 
        anime.id === editingAnime.id 
          ? { ...formData, id: editingAnime.id }
          : anime
      ))
    } else {
      // Új anime hozzáadása
      const newAnime: Anime = {
        ...formData,
        id: Math.max(...animes.map(a => a.id)) + 1
      }
      setAnimes([...animes, newAnime])
    }
    
    // Form reset
    setFormData({
      title: '',
      originalTitle: '',
      image: '',
      rating: 0,
      year: new Date().getFullYear(),
      genres: [],
      status: 'Tervezett',
      episodes: 1,
      description: '',
      downloadLinks: [{ quality: '1080p', size: '', link: '' }]
    })
    setIsUploadModalOpen(false)
    setEditingAnime(null)
  }

  const handleDelete = (id: number) => {
    if (confirm('Biztosan törölni szeretnéd ezt az animét?')) {
      setAnimes(animes.filter(anime => anime.id !== id))
    }
  }

  const handleEdit = (anime: Anime) => {
    setEditingAnime(anime)
    setFormData({
      title: anime.title,
      originalTitle: anime.originalTitle,
      image: anime.image,
      rating: anime.rating,
      year: anime.year,
      genres: anime.genres,
      status: anime.status,
      episodes: anime.episodes,
      description: anime.description,
      downloadLinks: anime.downloadLinks
    })
    setIsUploadModalOpen(true)
  }

  const addDownloadLink = () => {
    setFormData({
      ...formData,
      downloadLinks: [...formData.downloadLinks, { quality: '1080p', size: '', link: '' }]
    })
  }

  const removeDownloadLink = (index: number) => {
    setFormData({
      ...formData,
      downloadLinks: formData.downloadLinks.filter((_, i) => i !== index)
    })
  }

  const updateDownloadLink = (index: number, field: string, value: string) => {
    const newLinks = [...formData.downloadLinks]
    newLinks[index] = { ...newLinks[index], [field]: value }
    setFormData({ ...formData, downloadLinks: newLinks })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-white/70">Mahou Fansub tartalom kezelése</p>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="btn-primary text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Új Anime</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-effect rounded-lg p-6">
            <div className="text-3xl font-bold text-white">{animes.length}</div>
            <div className="text-white/70">Összes Anime</div>
          </div>
          <div className="glass-effect rounded-lg p-6">
            <div className="text-3xl font-bold text-white">
              {animes.filter(a => a.status === 'Folyamatban').length}
            </div>
            <div className="text-white/70">Folyamatban</div>
          </div>
          <div className="glass-effect rounded-lg p-6">
            <div className="text-3xl font-bold text-white">
              {animes.filter(a => a.status === 'Befejezve').length}
            </div>
            <div className="text-white/70">Befejezve</div>
          </div>
          <div className="glass-effect rounded-lg p-6">
            <div className="text-3xl font-bold text-white">
              {animes.reduce((sum, anime) => sum + anime.episodes, 0)}
            </div>
            <div className="text-white/70">Összes Epizód</div>
          </div>
        </div>

        {/* Anime List */}
        <div className="glass-effect rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Anime Lista</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4">Kép</th>
                  <th className="text-left py-3 px-4">Cím</th>
                  <th className="text-left py-3 px-4">Év</th>
                  <th className="text-left py-3 px-4">Státusz</th>
                  <th className="text-left py-3 px-4">Értékelés</th>
                  <th className="text-left py-3 px-4">Műveletek</th>
                </tr>
              </thead>
              <tbody>
                {animes.map((anime) => (
                  <tr key={anime.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="py-3 px-4">
                      <img 
                        src={anime.image} 
                        alt={anime.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{anime.title}</div>
                        <div className="text-sm text-white/70">{anime.originalTitle}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{anime.year}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        anime.status === 'Befejezve' 
                          ? 'bg-green-500' 
                          : anime.status === 'Folyamatban'
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                      }`}>
                        {anime.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">⭐ {anime.rating}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(anime)}
                          className="p-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(anime.id)}
                          className="p-2 bg-red-500 hover:bg-red-600 rounded text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upload Modal */}
        {isUploadModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass-effect rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {editingAnime ? 'Anime Szerkesztése' : 'Új Anime Feltöltése'}
                </h3>
                <button
                  onClick={() => {
                    setIsUploadModalOpen(false)
                    setEditingAnime(null)
                  }}
                  className="text-white/70 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Magyar Cím</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-anime-primary"
                      placeholder="pl. Attack on Titan"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Eredeti Cím</label>
                    <input
                      type="text"
                      value={formData.originalTitle}
                      onChange={(e) => setFormData({...formData, originalTitle: e.target.value})}
                      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-anime-primary"
                      placeholder="pl. 進撃の巨人"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Kép URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-anime-primary"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Év</label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-anime-primary"
                      min="1900"
                      max="2030"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Értékelés</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="10"
                      value={formData.rating}
                      onChange={(e) => setFormData({...formData, rating: parseFloat(e.target.value)})}
                      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-anime-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Epizódok</label>
                    <input
                      type="number"
                      value={formData.episodes}
                      onChange={(e) => setFormData({...formData, episodes: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-anime-primary"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Műfajok</label>
                  <div className="flex flex-wrap gap-2">
                    {availableGenres.map((genre) => (
                      <button
                        key={genre}
                        type="button"
                        onClick={() => {
                          if (formData.genres.includes(genre)) {
                            setFormData({
                              ...formData,
                              genres: formData.genres.filter(g => g !== genre)
                            })
                          } else {
                            setFormData({
                              ...formData,
                              genres: [...formData.genres, genre]
                            })
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm ${
                          formData.genres.includes(genre)
                            ? 'bg-anime-primary text-white'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Státusz</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-anime-primary"
                  >
                    <option value="Tervezett">Tervezett</option>
                    <option value="Folyamatban">Folyamatban</option>
                    <option value="Befejezve">Befejezve</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Leírás</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-anime-primary h-24"
                    placeholder="Rövid leírás az animéről..."
                    required
                  />
                </div>

                {/* Download Links */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-white font-medium">Letöltési Linkek</label>
                    <button
                      type="button"
                      onClick={addDownloadLink}
                      className="text-anime-primary hover:text-anime-secondary flex items-center space-x-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Új Link</span>
                    </button>
                  </div>
                  {formData.downloadLinks.map((link, index) => (
                    <div key={index} className="grid grid-cols-3 gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Minőség (pl. 1080p)"
                        value={link.quality}
                        onChange={(e) => updateDownloadLink(index, 'quality', e.target.value)}
                        className="px-3 py-2 rounded bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-anime-primary"
                      />
                      <input
                        type="text"
                        placeholder="Méret (pl. 2.1 GB)"
                        value={link.size}
                        onChange={(e) => updateDownloadLink(index, 'size', e.target.value)}
                        className="px-3 py-2 rounded bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-anime-primary"
                      />
                      <div className="flex">
                        <input
                          type="url"
                          placeholder="Link URL"
                          value={link.link}
                          onChange={(e) => updateDownloadLink(index, 'link', e.target.value)}
                          className="flex-1 px-3 py-2 rounded-l bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-anime-primary"
                        />
                        <button
                          type="button"
                          onClick={() => removeDownloadLink(index)}
                          className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-r"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsUploadModalOpen(false)
                      setEditingAnime(null)
                    }}
                    className="px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    Mégse
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{editingAnime ? 'Mentés' : 'Feltöltés'}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
