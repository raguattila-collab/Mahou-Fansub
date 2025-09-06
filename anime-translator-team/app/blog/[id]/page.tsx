'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Calendar, User, Tag, ArrowLeft, Share2, Heart } from 'lucide-react'
import { blogData, BlogPost, getRecentPosts } from '@/data/blogData'
import Image from 'next/image'

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const postId = parseInt(params.id as string)
    const foundPost = blogData.find(p => p.id === postId && p.isPublished)
    setPost(foundPost || null)
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

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-anime-light to-anime-neutral flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-anime-text mb-4">Cikk nem található</h1>
          <a href="/blog" className="btn-primary text-white px-6 py-2 rounded-lg">
            Vissza a blogra
          </a>
        </div>
      </div>
    )
  }

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
    <div className="min-h-screen bg-gradient-to-br from-anime-light to-anime-neutral">
      {/* Back Button */}
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <a
            href="/blog"
            className="inline-flex items-center space-x-2 text-anime-text hover:text-anime-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Vissza a blogra</span>
          </a>
        </div>
      </div>

      {/* Article */}
      <article className="px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-xl overflow-hidden">
            {/* Header */}
            <div className="p-8 border-b border-anime-primary/20">
              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                  {getCategoryLabel(post.category)}
                </span>
                <span className="text-anime-textLight text-sm">
                  {new Date(post.publishDate).toLocaleDateString('hu-HU')}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-anime-text mb-4">
                {post.title}
              </h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-anime-textLight">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(post.publishDate).toLocaleDateString('hu-HU')}</span>
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
            </div>

            {/* Featured Image */}
            {post.image && (
              <div className="p-8">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={400}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-anime-textLight leading-relaxed text-lg">
                  {post.content}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-anime-primary/20">
                <h3 className="text-lg font-semibold text-anime-text mb-4 flex items-center space-x-2">
                  <Tag className="w-5 h-5" />
                  <span>Címkék</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-anime-primary/20 text-anime-primary text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-anime-text mb-6">
              Kapcsolódó cikkek
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {getRecentPosts(4)
                .filter(relatedPost => relatedPost.id !== post.id)
                .slice(0, 2)
                .map((relatedPost) => (
                  <a
                    key={relatedPost.id}
                    href={`/blog/${relatedPost.id}`}
                    className="glass-effect rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    {relatedPost.image && (
                      <Image
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        width={400}
                        height={200}
                        className="w-full h-32 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-lg font-semibold text-anime-text mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-anime-textLight text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-xs text-anime-textLight">
                        {new Date(relatedPost.publishDate).toLocaleDateString('hu-HU')}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(relatedPost.category)}`}>
                        {getCategoryLabel(relatedPost.category)}
                      </span>
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
