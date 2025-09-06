export interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  author: string
  publishDate: string
  category: 'release' | 'team' | 'announcement' | 'update'
  image?: string
  tags: string[]
  isPublished: boolean
}

export const blogData: BlogPost[] = [
  {
    id: 1,
    title: "Új anime: Attack on Titan Final Season",
    content: "Örömmel jelentjük be, hogy az Attack on Titan Final Season magyar felirattal elérhető! Ez a legendás anime sorozat záró évada, amely minden rajongót lenyűgözni fog. A minőségi fordítás és a gyors megjelenés a csapatunk prioritása.",
    excerpt: "Az Attack on Titan Final Season magyar felirattal elérhető!",
    author: "Admin User",
    publishDate: "2024-01-15T10:00:00Z",
    category: "release",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
    tags: ["Attack on Titan", "Új rész", "Anime"],
    isPublished: true
  },
  {
    id: 2,
    title: "Csapat bővülés - Új fordítók",
    content: "Büszkén jelentjük be, hogy a Mahou Fansub csapat bővült! Három új fordító csatlakozott hozzánk, akik segítenek a minőségi tartalom gyorsabb megjelenésében. Üdvözöljük őket a csapatban!",
    excerpt: "Három új fordító csatlakozott a Mahou Fansub csapathoz!",
    author: "Admin User",
    publishDate: "2024-01-12T14:30:00Z",
    category: "team",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=400&fit=crop",
    tags: ["Csapat", "Új tagok", "Hírek"],
    isPublished: true
  },
  {
    id: 3,
    title: "Demon Slayer Manga - Teljes sorozat",
    content: "A Demon Slayer manga teljes sorozata most elérhető magyarul! Mind a 205 fejezet minőségi fordításban, különböző minőségekben. Ez a fantasztikus történet Tanjiro útját követi a démonirtók világában.",
    excerpt: "A Demon Slayer manga teljes sorozata magyarul elérhető!",
    author: "Fordító Példa",
    publishDate: "2024-01-10T09:15:00Z",
    category: "release",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&h=400&fit=crop",
    tags: ["Demon Slayer", "Manga", "Teljes sorozat"],
    isPublished: true
  },
  {
    id: 4,
    title: "Weboldal frissítés - Új funkciók",
    content: "Frissítettük a weboldalt új funkciókkal! Most már kereshetsz műfaj szerint, szűrhetsz státusz alapján, és könnyebben navigálhatsz a tartalmak között. A felhasználói felület is megújult a jobb élményért.",
    excerpt: "Új funkciók a weboldalon - jobb keresés és szűrés!",
    author: "Technikus Anna",
    publishDate: "2024-01-08T16:45:00Z",
    category: "update",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    tags: ["Weboldal", "Frissítés", "Új funkciók"],
    isPublished: true
  },
  {
    id: 5,
    title: "One Piece - 1000. epizód ünnepi kiadás",
    content: "Ünnepeljük a One Piece 1000. epizódját! Ez a különleges alkalom miatt egyedi csomagot készítettünk, amely tartalmazza a legjobb jeleneteket és egy exkluzív interjút a fordító csapattal. Ne hagyd ki!",
    excerpt: "One Piece 1000. epizód ünnepi kiadása - különleges tartalom!",
    author: "Kreatív Márk",
    publishDate: "2024-01-05T12:00:00Z",
    category: "announcement",
    image: "https://images.unsplash.com/photo-1613376023733-0a73315d9b06?w=800&h=400&fit=crop",
    tags: ["One Piece", "Ünnepi", "1000. epizód"],
    isPublished: true
  },
  {
    id: 6,
    title: "Tervezett anime - 2024 tavasz",
    content: "Bemutatjuk a 2024 tavaszi szezon tervezett animeit! A csapatunk már dolgozik a legnépszerűbb sorozatok fordításán. A listán szerepel a My Hero Academia új évada, a Demon Slayer folytatása és még sok más!",
    excerpt: "2024 tavaszi szezon tervezett animei - mit várhatunk?",
    author: "Admin User",
    publishDate: "2024-01-03T08:30:00Z",
    category: "announcement",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop",
    tags: ["Tervezett", "2024", "Tavaszi szezon"],
    isPublished: true
  }
]

export const getPostsByCategory = (category: string) => {
  return blogData.filter(post => post.category === category && post.isPublished)
}

export const getRecentPosts = (limit: number = 5) => {
  return blogData
    .filter(post => post.isPublished)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit)
}
