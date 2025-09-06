export interface Content {
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

// Backward compatibility
export interface Anime extends Content {
  episodes: number
  type: 'anime'
}

export const contentData: Content[] = [
  {
    id: 1,
    title: "Attack on Titan",
    originalTitle: "進撃の巨人",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    rating: 9.2,
    year: 2013,
    genres: ["Akció", "Drama", "Fantasy"],
    status: "Befejezve",
    episodes: 75,
    type: "anime",
    description: "Eren Yeager és barátai harcolnak a titánok ellen, hogy megvédjék az emberiséget.",
    downloadLinks: [
      { quality: "1080p", size: "2.1 GB", link: "#" },
      { quality: "720p", size: "1.2 GB", link: "#" },
      { quality: "480p", size: "800 MB", link: "#" }
    ]
  },
  {
    id: 2,
    title: "Demon Slayer",
    originalTitle: "鬼滅の刃",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop",
    rating: 8.8,
    year: 2019,
    genres: ["Akció", "Fantasy", "Drama"],
    status: "Befejezve",
    episodes: 44,
    type: "anime",
    description: "Tanjiro Kamado csatlakozik a démonirtókhoz, hogy megmentse húgát.",
    downloadLinks: [
      { quality: "1080p", size: "1.8 GB", link: "#" },
      { quality: "720p", size: "1.0 GB", link: "#" },
      { quality: "480p", size: "600 MB", link: "#" }
    ]
  },
  {
    id: 3,
    title: "Your Name",
    originalTitle: "君の名は。",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
    rating: 9.0,
    year: 2016,
    genres: ["Romantikus", "Drama", "Fantasy"],
    status: "Befejezve",
    episodes: 1,
    type: "anime",
    description: "Egy fiú és egy lány testet cserélnek, és megpróbálják megérteni mi történik.",
    downloadLinks: [
      { quality: "1080p", size: "3.2 GB", link: "#" },
      { quality: "720p", size: "1.8 GB", link: "#" },
      { quality: "480p", size: "1.2 GB", link: "#" }
    ]
  },
  {
    id: 4,
    title: "One Piece",
    originalTitle: "ワンピース",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop",
    rating: 9.5,
    year: 1999,
    genres: ["Akció", "Kaland", "Komedi"],
    status: "Folyamatban",
    episodes: 1000,
    type: "anime",
    description: "Monkey D. Luffy és csapata a One Piece kincs után kutat.",
    downloadLinks: [
      { quality: "1080p", size: "2.5 GB", link: "#" },
      { quality: "720p", size: "1.4 GB", link: "#" },
      { quality: "480p", size: "900 MB", link: "#" }
    ]
  },
  {
    id: 5,
    title: "Spirited Away",
    originalTitle: "千と千尋の神隠し",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    rating: 9.3,
    year: 2001,
    genres: ["Fantasy", "Kaland", "Drama"],
    status: "Befejezve",
    episodes: 1,
    type: "anime",
    description: "Chihiro egy furcsa világba kerül, ahol meg kell dolgoznia a szülei megmentéséért.",
    downloadLinks: [
      { quality: "1080p", size: "2.8 GB", link: "#" },
      { quality: "720p", size: "1.6 GB", link: "#" },
      { quality: "480p", size: "1.0 GB", link: "#" }
    ]
  },
  {
    id: 6,
    title: "My Hero Academia",
    originalTitle: "僕のヒーローアカデミア",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop",
    rating: 8.7,
    year: 2016,
    genres: ["Akció", "Kaland", "Sci-Fi"],
    status: "Folyamatban",
    episodes: 138,
    type: "anime",
    description: "Izuku Midoriya álma, hogy hős legyen, de nincs különleges képessége.",
    downloadLinks: [
      { quality: "1080p", size: "2.0 GB", link: "#" },
      { quality: "720p", size: "1.1 GB", link: "#" },
      { quality: "480p", size: "700 MB", link: "#" }
    ]
  },
  {
    id: 7,
    title: "Death Note",
    originalTitle: "デスノート",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    rating: 9.1,
    year: 2006,
    genres: ["Thriller", "Drama", "Sci-Fi"],
    status: "Befejezve",
    episodes: 37,
    type: "anime",
    description: "Light Yagami talál egy halálos jegyzetfüzetet, amivel megváltoztathatja a világot.",
    downloadLinks: [
      { quality: "1080p", size: "1.5 GB", link: "#" },
      { quality: "720p", size: "850 MB", link: "#" },
      { quality: "480p", size: "550 MB", link: "#" }
    ]
  },
  {
    id: 8,
    title: "Naruto",
    originalTitle: "ナルト",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop",
    rating: 8.9,
    year: 2002,
    genres: ["Akció", "Kaland", "Komedi"],
    status: "Befejezve",
    episodes: 720,
    type: "anime",
    description: "Naruto Uzumaki álma, hogy a Hokage legyen, a falu legerősebb ninjája.",
    downloadLinks: [
      { quality: "1080p", size: "2.2 GB", link: "#" },
      { quality: "720p", size: "1.3 GB", link: "#" },
      { quality: "480p", size: "800 MB", link: "#" }
    ]
  },
  // Manga tartalmak
  {
    id: 9,
    title: "One Piece Manga",
    originalTitle: "ワンピース",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop",
    rating: 9.6,
    year: 1997,
    genres: ["Akció", "Kaland", "Komedi"],
    status: "Folyamatban",
    chapters: 1095,
    type: "manga",
    description: "Monkey D. Luffy és csapata a One Piece kincs után kutat - manga verzió.",
    downloadLinks: [
      { quality: "Magas minőség", size: "50 MB", link: "#" },
      { quality: "Közepes minőség", size: "25 MB", link: "#" },
      { quality: "Alacsony minőség", size: "15 MB", link: "#" }
    ]
  },
  {
    id: 10,
    title: "Attack on Titan Manga",
    originalTitle: "進撃の巨人",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    rating: 9.4,
    year: 2009,
    genres: ["Akció", "Drama", "Fantasy"],
    status: "Befejezve",
    chapters: 139,
    type: "manga",
    description: "Eren Yeager és barátai harcolnak a titánok ellen - manga verzió.",
    downloadLinks: [
      { quality: "Magas minőség", size: "45 MB", link: "#" },
      { quality: "Közepes minőség", size: "22 MB", link: "#" },
      { quality: "Alacsony minőség", size: "12 MB", link: "#" }
    ]
  },
  {
    id: 11,
    title: "Demon Slayer Manga",
    originalTitle: "鬼滅の刃",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop",
    rating: 9.0,
    year: 2016,
    genres: ["Akció", "Fantasy", "Drama"],
    status: "Befejezve",
    chapters: 205,
    type: "manga",
    description: "Tanjiro Kamado csatlakozik a démonirtókhoz - manga verzió.",
    downloadLinks: [
      { quality: "Magas minőség", size: "40 MB", link: "#" },
      { quality: "Közepes minőség", size: "20 MB", link: "#" },
      { quality: "Alacsony minőség", size: "10 MB", link: "#" }
    ]
  },
  {
    id: 12,
    title: "My Hero Academia Manga",
    originalTitle: "僕のヒーローアカデミア",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop",
    rating: 8.9,
    year: 2014,
    genres: ["Akció", "Kaland", "Sci-Fi"],
    status: "Folyamatban",
    chapters: 400,
    type: "manga",
    description: "Izuku Midoriya álma, hogy hős legyen - manga verzió.",
    downloadLinks: [
      { quality: "Magas minőség", size: "35 MB", link: "#" },
      { quality: "Közepes minőség", size: "18 MB", link: "#" },
      { quality: "Alacsony minőség", size: "9 MB", link: "#" }
    ]
  },
  {
    id: 13,
    title: "Death Note Manga",
    originalTitle: "デスノート",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    rating: 9.3,
    year: 2003,
    genres: ["Thriller", "Drama", "Sci-Fi"],
    status: "Befejezve",
    chapters: 108,
    type: "manga",
    description: "Light Yagami talál egy halálos jegyzetfüzetet - manga verzió.",
    downloadLinks: [
      { quality: "Magas minőség", size: "30 MB", link: "#" },
      { quality: "Közepes minőség", size: "15 MB", link: "#" },
      { quality: "Alacsony minőség", size: "8 MB", link: "#" }
    ]
  },
  {
    id: 14,
    title: "Naruto Manga",
    originalTitle: "ナルト",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=400&h=600&fit=crop",
    rating: 9.1,
    year: 1999,
    genres: ["Akció", "Kaland", "Komedi"],
    status: "Befejezve",
    chapters: 700,
    type: "manga",
    description: "Naruto Uzumaki álma, hogy a Hokage legyen - manga verzió.",
    downloadLinks: [
      { quality: "Magas minőség", size: "55 MB", link: "#" },
      { quality: "Közepes minőség", size: "28 MB", link: "#" },
      { quality: "Alacsony minőség", size: "14 MB", link: "#" }
    ]
  }
]

// Backward compatibility
export const animeData = contentData.filter(item => item.type === 'anime') as Anime[]
