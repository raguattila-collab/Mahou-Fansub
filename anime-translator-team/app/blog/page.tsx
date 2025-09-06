'use client'

import { useState } from 'react'
import { Calendar, User, Tag, ArrowRight, Filter } from 'lucide-react'
import { blogData, BlogPost, getPostsByCategory, getRecentPosts } from '@/data/blogData'
import Image from 'next/image'

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { value: 'all', label: 'Összes', count: blogData.filter(p => p.isPublished).length },
    { value: 'release', label: 'Új részek', count: getPostsByCategory('release').length },
    { value: 'team', label: 'Csapat hírek', count: getPostsByCategory('team').length },
    { value: 'announcement', label: 'Hirdetések', count: getPostsByCategory('announcement').length },
    { value: 'update', label: 'Frissítések', count: getPostsByCategory('update').length }
  ]

  const filteredPosts = blogData
    .filter(post => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      return post.isPublished && matchesCategory && matchesSearch
    })
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'release': return 'bg-green-100 text-green-800'
      case 'team': return 'bg-blue-100 text-blue-800'
      case 'announcement': return 'bg-yellow-100 text-yellow-800'
      case 'update': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'release': return 'Új rész'
      case 'team': return 'Csapat'
      case 'announcement': return 'Hirdetés'
      case 'update': return 'Frissítés'
      default: return 'Általános'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-anime-light to-anime-neutral py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-anime-text mb-4">
            Blog & Hírek
          </h1>
          <p className="text-xl text-anime-textLight">
            Legfrissebb hírek, új részek és csapat hírek
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Search */}
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-lg font-semibold text-anime-text mb-4">
                  Keresés
                </h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Keresés a cikkekben..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 text-anime-text"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-lg font-semibold text-anime-text mb-4">
                  Kategóriák
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.value
                          ? 'bg-anime-primary text-white'
                          : 'text-anime-textLight hover:bg-anime-primary/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.label}</span>
                        <span className="text-sm opacity-75">({category.count})</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-lg font-semibold text-anime-text mb-4">
                  Legutóbbi cikkek
                </h3>
                <div className="space-y-3">
                  {getRecentPosts(3).map((post) => (
                    <a
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="block hover:bg-anime-primary/10 p-2 rounded-lg transition-colors"
                    >
                      <h4 className="text-sm font-medium text-anime-text line-clamp-2 mb-1">
                        {post.title}
                      </h4>
                      <p className="text-xs text-anime-textLight">
                        {new Date(post.publishDate).toLocaleDateString('hu-HU')}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Filter Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-anime-textLight" />
                <span className="text-anime-textLight">
                  {filteredPosts.length} cikk találat
                </span>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="glass-effect rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                    {/* Image */}
                    {post.image && (
                      <div className="md:col-span-1">
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className={`${post.image ? 'md:col-span-2' : 'md:col-span-3'}`}>
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                          {getCategoryLabel(post.category)}
                        </span>
                        <span className="text-anime-textLight text-sm">
                          {new Date(post.publishDate).toLocaleDateString('hu-HU')}
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold text-anime-text mb-3 hover:text-anime-primary transition-colors">
                        <a href={`/blog/${post.id}`}>
                          {post.title}
                        </a>
                      </h2>

                      <p className="text-anime-textLight mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-anime-textLight">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.publishDate).toLocaleDateString('hu-HU')}</span>
                          </div>
                        </div>

                        <a
                          href={`/blog/${post.id}`}
                          className="flex items-center space-x-1 text-anime-primary hover:text-anime-secondary transition-colors font-medium"
                        >
                          <span>Olvasás</span>
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-anime-primary/20 text-anime-primary text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-anime-textLight text-lg">
                  Nincs találat a keresési feltételeknek megfelelően
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
