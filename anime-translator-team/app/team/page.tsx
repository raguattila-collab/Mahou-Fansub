'use client'

import { useState } from 'react'
import { Users, Mail, Calendar, Award, Github, MessageCircle } from 'lucide-react'
import { teamData, TeamMember } from '@/data/teamData'
import Image from 'next/image'

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const activeMembers = teamData.filter(member => member.isActive)
  const admins = teamData.filter(member => member.isAdmin)
  const translators = teamData.filter(member => member.role.includes('Fordító'))
  const editors = teamData.filter(member => member.role.includes('Szerkesztő'))

  return (
    <div className="min-h-screen bg-gradient-to-br from-anime-light to-anime-neutral">
      {/* Header */}
      <div className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-anime-text mb-6">
            Mahou Fansub Csapat
          </h1>
          <p className="text-xl text-anime-textLight mb-8">
            Ismerd meg a csapat tagjait, akik minőségi anime és manga tartalmakat készítenek magyarul
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="glass-effect rounded-lg p-6">
              <Users className="w-8 h-8 text-anime-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-anime-text">{activeMembers.length}</div>
              <div className="text-anime-textLight">Aktív Tag</div>
            </div>
            <div className="glass-effect rounded-lg p-6">
              <Award className="w-8 h-8 text-anime-secondary mx-auto mb-2" />
              <div className="text-2xl font-bold text-anime-text">{admins.length}</div>
              <div className="text-anime-textLight">Admin</div>
            </div>
            <div className="glass-effect rounded-lg p-6">
              <MessageCircle className="w-8 h-8 text-anime-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-anime-text">{translators.length}</div>
              <div className="text-anime-textLight">Fordító</div>
            </div>
            <div className="glass-effect rounded-lg p-6">
              <Calendar className="w-8 h-8 text-anime-dark mx-auto mb-2" />
              <div className="text-2xl font-bold text-anime-text">2020</div>
              <div className="text-anime-textLight">Alapítás</div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-anime-text text-center mb-12">
            Csapat Tagjai
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {activeMembers.map((member) => (
              <div
                key={member.id}
                className="anime-card rounded-xl p-6 text-center cursor-pointer group"
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative mb-4">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="w-30 h-30 rounded-full mx-auto object-cover border-4 border-anime-primary/20 group-hover:border-anime-primary/50 transition-colors"
                  />
                  {member.isAdmin && (
                    <div className="absolute -top-2 -right-2 bg-anime-primary text-white rounded-full p-1">
                      <Award className="w-4 h-4" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-anime-text mb-2">
                  {member.name}
                </h3>
                <p className="text-anime-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-anime-textLight text-sm mb-4 line-clamp-3">
                  {member.description}
                </p>
                
                <div className="flex flex-wrap gap-1 justify-center mb-4">
                  {member.specialties.slice(0, 2).map((specialty, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-anime-primary/20 text-anime-primary text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                  {member.specialties.length > 2 && (
                    <span className="px-2 py-1 bg-anime-neutral/50 text-anime-textLight text-xs rounded-full">
                      +{member.specialties.length - 2}
                    </span>
                  )}
                </div>

                <div className="flex justify-center space-x-3">
                  {member.socialLinks.discord && (
                    <a
                      href={`https://discord.com/users/${member.socialLinks.discord}`}
                      className="text-anime-textLight hover:text-anime-primary transition-colors"
                      title="Discord"
                    >
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  )}
                  {member.socialLinks.email && (
                    <a
                      href={`mailto:${member.socialLinks.email}`}
                      className="text-anime-textLight hover:text-anime-primary transition-colors"
                      title="Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                  {member.socialLinks.github && (
                    <a
                      href={`https://github.com/${member.socialLinks.github}`}
                      className="text-anime-textLight hover:text-anime-primary transition-colors"
                      title="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0">
                <Image
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  width={150}
                  height={150}
                  className="w-32 h-32 rounded-full object-cover border-4 border-anime-primary/20"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-anime-text mb-1">
                      {selectedMember.name}
                    </h3>
                    <p className="text-anime-primary font-medium text-lg">
                      {selectedMember.role}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-anime-textLight hover:text-anime-text text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <p className="text-anime-textLight mb-6">
                  {selectedMember.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-anime-text mb-3">
                    Szakértelem
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-anime-primary/20 text-anime-primary text-sm rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-anime-text mb-3">
                    Csatlakozás dátuma
                  </h4>
                  <p className="text-anime-textLight">
                    {new Date(selectedMember.joinDate).toLocaleDateString('hu-HU', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  {selectedMember.socialLinks.discord && (
                    <a
                      href={`https://discord.com/users/${selectedMember.socialLinks.discord}`}
                      className="flex items-center space-x-2 text-anime-textLight hover:text-anime-primary transition-colors"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>Discord</span>
                    </a>
                  )}
                  {selectedMember.socialLinks.email && (
                    <a
                      href={`mailto:${selectedMember.socialLinks.email}`}
                      className="flex items-center space-x-2 text-anime-textLight hover:text-anime-primary transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Email</span>
                    </a>
                  )}
                  {selectedMember.socialLinks.github && (
                    <a
                      href={`https://github.com/${selectedMember.socialLinks.github}`}
                      className="flex items-center space-x-2 text-anime-textLight hover:text-anime-primary transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
