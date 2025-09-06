'use client'

interface FilterBarProps {
  genres: string[]
  statuses: string[]
  types: string[]
  selectedGenre: string
  selectedStatus: string
  selectedType: string
  onGenreChange: (genre: string) => void
  onStatusChange: (status: string) => void
  onTypeChange: (type: string) => void
}

export default function FilterBar({
  genres,
  statuses,
  types,
  selectedGenre,
  selectedStatus,
  selectedType,
  onGenreChange,
  onStatusChange,
  onTypeChange
}: FilterBarProps) {
  return (
    <div className="glass-effect mx-4 rounded-xl p-6 mb-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Type Filter */}
          <div className="flex-1">
            <label className="block text-anime-text font-medium mb-3">Típus</label>
            <div className="flex flex-wrap gap-2">
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => onTypeChange(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedType === type
                      ? 'bg-anime-primary text-white shadow-lg'
                      : 'bg-white/20 text-anime-text hover:bg-white/30'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Genre Filter */}
          <div className="flex-1">
            <label className="block text-anime-text font-medium mb-3">Műfaj</label>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => onGenreChange(genre)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedGenre === genre
                      ? 'bg-anime-primary text-white shadow-lg'
                      : 'bg-white/20 text-anime-text hover:bg-white/30'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div className="flex-1">
            <label className="block text-anime-text font-medium mb-3">Státusz</label>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedStatus === status
                      ? 'bg-anime-secondary text-white shadow-lg'
                      : 'bg-white/20 text-anime-text hover:bg-white/30'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
