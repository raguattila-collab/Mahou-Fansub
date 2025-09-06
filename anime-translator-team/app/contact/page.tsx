'use client'

import { useState } from 'react'
import { Mail, MessageCircle, Send, MapPin, Phone, Clock } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const categories = [
    { value: 'general', label: 'Általános kérdés' },
    { value: 'bug', label: 'Hiba jelentés' },
    { value: 'suggestion', label: 'Javaslat' },
    { value: 'partnership', label: 'Együttműködés' },
    { value: 'support', label: 'Támogatás' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Szimulált küldés (valós alkalmazásban itt API hívás lenne)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Form reset
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      category: 'general'
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-anime-light to-anime-neutral flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="glass-effect rounded-xl p-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-anime-text mb-4">
              Üzenet elküldve!
            </h1>
            <p className="text-anime-textLight mb-6">
              Köszönjük az üzenetet! Hamarosan válaszolunk.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="btn-primary text-white px-6 py-2 rounded-lg font-medium"
            >
              Új üzenet küldése
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-anime-light to-anime-neutral py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-anime-text mb-4">
            Kapcsolat
          </h1>
          <p className="text-xl text-anime-textLight">
            Kérdésed van? Írj nekünk!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="glass-effect rounded-xl p-8">
            <h2 className="text-2xl font-bold text-anime-text mb-6">
              Üzenet küldése
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-anime-text font-medium mb-2">
                    Név *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 focus:border-anime-primary text-anime-text"
                    placeholder="Teljes neved"
                    required
                  />
                </div>
                <div>
                  <label className="block text-anime-text font-medium mb-2">
                    Email cím *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 focus:border-anime-primary text-anime-text"
                    placeholder="pelda@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-anime-text font-medium mb-2">
                  Kategória
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 focus:border-anime-primary text-anime-text"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-anime-text font-medium mb-2">
                  Tárgy *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 focus:border-anime-primary text-anime-text"
                  placeholder="Üzenet tárgya"
                  required
                />
              </div>

              <div>
                <label className="block text-anime-text font-medium mb-2">
                  Üzenet *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-anime-primary/30 focus:outline-none focus:ring-2 focus:ring-anime-primary/50 focus:border-anime-primary text-anime-text resize-none"
                  placeholder="Írd ide az üzeneted..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Üzenet küldése</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="glass-effect rounded-xl p-8">
              <h3 className="text-2xl font-bold text-anime-text mb-6">
                Kapcsolati információk
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-anime-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-anime-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-anime-text mb-1">Email</h4>
                    <p className="text-anime-textLight">info@mahoufansub.hu</p>
                    <p className="text-anime-textLight">support@mahoufansub.hu</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-anime-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-anime-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-anime-text mb-1">Discord</h4>
                    <p className="text-anime-textLight">Mahou Fansub Server</p>
                    <p className="text-anime-textLight">#general #support</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-anime-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-anime-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-anime-text mb-1">Válaszidő</h4>
                    <p className="text-anime-textLight">24-48 óra</p>
                    <p className="text-anime-textLight">Hétfő-Péntek 9:00-18:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="glass-effect rounded-xl p-8">
              <h3 className="text-2xl font-bold text-anime-text mb-6">
                Gyakran ismételt kérdések
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-anime-text mb-2">
                    Mikor jelennek meg az új részek?
                  </h4>
                  <p className="text-anime-textLight text-sm">
                    Általában 1-2 héten belül az eredeti megjelenés után.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-anime-text mb-2">
                    Hogyan lehet csatlakozni a csapathoz?
                  </h4>
                  <p className="text-anime-textLight text-sm">
                    Írj nekünk emailben vagy Discord-on a részletekkel.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-anime-text mb-2">
                    Milyen minőségben elérhetők a tartalmak?
                  </h4>
                  <p className="text-anime-textLight text-sm">
                    480p, 720p és 1080p minőségben, különböző fájlméretekkel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
