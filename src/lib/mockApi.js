// Mock API para simular endpoints tipo MockAPI/Postman.
// Persistencia: localStorage.

const DB_KEY = 'nemi_db_v1'

const DEFAULT_TAQUIZA_PHOTOS = [
  'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=1200&h=600&q=80',
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=1200&h=600&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561d1b?auto=format&fit=crop&w=1200&h=600&q=80',
  'https://images.unsplash.com/photo-1585238341710-4b51926f5f90?auto=format&fit=crop&w=1200&h=600&q=80'
]

const DEFAULT_PARRILLADA_PHOTOS = [
  'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&h=600&q=80',
  'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&h=600&q=80',
  'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1200&h=600&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&h=600&q=80',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&h=600&q=80'
]

function normalizeProviderMedia(provider) {
  const looksParrilla = /parrillad|carne|arrachera/i.test(provider.specialty || '')
  const fallback = looksParrilla ? DEFAULT_PARRILLADA_PHOTOS : DEFAULT_TAQUIZA_PHOTOS
  const photos = Array.isArray(provider.photos) ? provider.photos.filter(Boolean) : []
  if (photos.length >= 3) return provider
  return { ...provider, photos: (photos.length ? photos : fallback).slice(0, 3) }
}

function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`
}

function readDB() {
  const raw = localStorage.getItem(DB_KEY)
  if (raw) {
    try {
      const db = JSON.parse(raw)
      if (db?.providers?.length) {
        let changed = false
        db.providers = db.providers.map(p => {
          const next = normalizeProviderMedia(p)
          if (next !== p) changed = true
          return next
        })
        if (changed) writeDB(db)
      }
      return db
    } catch { /* ignore */ }
  }
  // Seed inicial: proveedores demo + usuarios demo
  const seed = {
    users: [
      { id: 'u_client_demo', role: 'client', name: 'Cliente Demo', email: 'cliente@nemi.mx', password: '123456' },
      { id: 'u_provider_demo', role: 'provider', name: 'Taquero Demo', email: 'taquero@nemi.mx', password: '123456' }
    ],
    providers: [
      {
        id: 'p1',
        ownerUserId: 'u_provider_demo',
        name: 'Taquería El Pastor Feliz',
        specialty: 'Pastor / Bistec',
        rating: 4.8,
        badges: ['Destacado', 'Verificado'],
        basePrice: 150,
        coverRadiusKm: 15,
        yearsActive: 8,
        avgResponseHours: 2,
        serviceArea: 'CDMX y zona metropolitana',
        address: 'Polanco, CDMX',
        // coordenadas demo CDMX centro
        lat: 19.4326,
        lng: -99.1332,
        photos: DEFAULT_TAQUIZA_PHOTOS,
        description: 'Taquizas a domicilio con guarniciones y salsas. Atención para eventos sociales y corporativos.',
        packages: [
          { id: 'pk1', title: '50 personas', price: 7500 },
          { id: 'pk2', title: '100 personas', price: 14000 },
          { id: 'pk3', title: '150 personas', price: 19500 }
        ],
        reviews: [
          { id: 'r1', author: 'María', stars: 5, text: 'Muy buen servicio y puntuales.' },
          { id: 'r2', author: 'Jorge', stars: 4, text: 'Buen sabor y excelente atención.' }
        ]
      },
      {
        id: 'p2',
        ownerUserId: 'u_provider_demo',
        name: 'Parrilladas Norteñas',
        specialty: 'Parrillada',
        rating: 4.6,
        badges: ['Verificado', 'Popular'],
        basePrice: 220,
        coverRadiusKm: 20,
        yearsActive: 6,
        avgResponseHours: 3,
        serviceArea: 'Querétaro y alrededores',
        address: 'Centro, Querétaro',
        lat: 19.40,
        lng: -99.16,
        photos: DEFAULT_PARRILLADA_PHOTOS,
        description: 'Parrilladas con cortes y opciones vegetarianas. Montaje y personal incluidos.',
        packages: [
          { id: 'pk1', title: '30 personas', price: 9000 },
          { id: 'pk2', title: '80 personas', price: 20000 },
          { id: 'pk3', title: '120 personas', price: 28000 }
        ],
        reviews: [
          { id: 'r1', author: 'Andrea', stars: 5, text: 'Muy buena parrilla y presentación.' }
        ]
      },
      {
        id: 'p3',
        ownerUserId: 'u_provider_demo',
        name: 'Tacos de Canasta Don Toño',
        specialty: 'Tacos de canasta',
        rating: 4.4,
        badges: ['Popular', 'Tradicional'],
        basePrice: 120,
        coverRadiusKm: 10,
        yearsActive: 12,
        avgResponseHours: 1,
        serviceArea: 'Centro y sur CDMX',
        address: 'Centro Histórico, CDMX',
        lat: 19.428,
        lng: -99.127,
        photos: DEFAULT_TAQUIZA_PHOTOS,
        description: 'Tacos de canasta con guisos tradicionales y salsa casera.',
        packages: [
          { id: 'pk1', title: '40 personas', price: 4800 },
          { id: 'pk2', title: '80 personas', price: 9000 },
          { id: 'pk3', title: '120 personas', price: 12800 }
        ],
        reviews: [
          { id: 'r1', author: 'Carlos', stars: 4, text: 'Muy ricos y a tiempo.' },
          { id: 'r2', author: 'Mónica', stars: 5, text: 'Sabor casero y porciones generosas.' }
        ]
      },
      {
        id: 'p4',
        ownerUserId: 'u_provider_demo',
        name: 'Taquiza La Condesa',
        specialty: 'Taquiza gourmet',
        rating: 4.9,
        badges: ['Gourmet', 'Verificado'],
        basePrice: 300,
        coverRadiusKm: 18,
        yearsActive: 5,
        avgResponseHours: 2,
        serviceArea: 'Zona poniente CDMX',
        address: 'Condesa, CDMX',
        lat: 19.413,
        lng: -99.170,
        photos: DEFAULT_TAQUIZA_PHOTOS,
        description: 'Taquiza premium con ingredientes artesanales y montaje elegante.',
        packages: [
          { id: 'pk1', title: '30 personas', price: 11000 },
          { id: 'pk2', title: '60 personas', price: 20000 },
          { id: 'pk3', title: '100 personas', price: 31000 }
        ],
        reviews: [
          { id: 'r1', author: 'Sofía', stars: 5, text: 'Excelente presentación y sabor.' },
          { id: 'r2', author: 'Iván', stars: 5, text: 'Servicio premium, muy recomendado.' }
        ]
      },
      {
        id: 'p5',
        ownerUserId: 'u_provider_demo',
        name: 'Parrillada La Mexicana',
        specialty: 'Carne asada',
        rating: 4.5,
        badges: ['Familia', 'Popular'],
        basePrice: 260,
        coverRadiusKm: 22,
        yearsActive: 9,
        avgResponseHours: 4,
        serviceArea: 'Querétaro capital',
        address: 'Juriquilla, Querétaro',
        lat: 20.588,
        lng: -100.389,
        photos: DEFAULT_PARRILLADA_PHOTOS,
        description: 'Carne asada y guarniciones para eventos familiares.',
        packages: [
          { id: 'pk1', title: '40 personas', price: 12000 },
          { id: 'pk2', title: '90 personas', price: 24000 },
          { id: 'pk3', title: '140 personas', price: 34000 }
        ],
        reviews: [
          { id: 'r1', author: 'Ramón', stars: 4, text: 'Muy buen sabor y porciones abundantes.' }
        ]
      },
      {
        id: 'p6',
        ownerUserId: 'u_provider_demo',
        name: 'Tacos al Carbón La 99',
        specialty: 'Tacos al carbón',
        rating: 4.3,
        badges: ['Rápido'],
        basePrice: 180,
        coverRadiusKm: 12,
        yearsActive: 7,
        avgResponseHours: 1,
        serviceArea: 'Norte CDMX',
        address: 'Lindavista, CDMX',
        lat: 19.475,
        lng: -99.140,
        photos: DEFAULT_TAQUIZA_PHOTOS,
        description: 'Tacos al carbón con opciones de res y pollo, servicio rápido.',
        packages: [
          { id: 'pk1', title: '25 personas', price: 4500 },
          { id: 'pk2', title: '60 personas', price: 9800 },
          { id: 'pk3', title: '100 personas', price: 15500 }
        ],
        reviews: [
          { id: 'r1', author: 'Paola', stars: 4, text: 'Servicio rápido y buena calidad.' }
        ]
      },
      {
        id: 'p7',
        ownerUserId: 'u_provider_demo',
        name: 'Taquería Express',
        specialty: 'Tacos variados',
        rating: 4.2,
        badges: ['Económico'],
        basePrice: 110,
        coverRadiusKm: 8,
        yearsActive: 4,
        avgResponseHours: 2,
        serviceArea: 'Centro CDMX',
        address: 'Doctores, CDMX',
        lat: 19.436,
        lng: -99.140,
        photos: DEFAULT_TAQUIZA_PHOTOS,
        description: 'Taquería con variedad de guisos y servicio económico.',
        packages: [
          { id: 'pk1', title: '30 personas', price: 3600 },
          { id: 'pk2', title: '70 personas', price: 7800 },
          { id: 'pk3', title: '120 personas', price: 11800 }
        ],
        reviews: [
          { id: 'r1', author: 'Alejandra', stars: 4, text: 'Excelente relación calidad-precio.' }
        ]
      },
      {
        id: 'p8',
        ownerUserId: 'u_provider_demo',
        name: 'Carnitas El Jefe',
        specialty: 'Carnitas de cerdo',
        rating: 4.7,
        badges: ['Tradicional', 'Verificado'],
        basePrice: 200,
        coverRadiusKm: 14,
        yearsActive: 15,
        avgResponseHours: 3,
        serviceArea: 'Sur CDMX',
        address: 'Coyoacán, CDMX',
        lat: 19.365,
        lng: -99.180,
        photos: DEFAULT_TAQUIZA_PHOTOS,
        description: 'Carnitas estilo Michoacán para eventos y reuniones.',
        packages: [
          { id: 'pk1', title: '40 personas', price: 8500 },
          { id: 'pk2', title: '90 personas', price: 17500 },
          { id: 'pk3', title: '140 personas', price: 25500 }
        ],
        reviews: [
          { id: 'r1', author: 'Héctor', stars: 5, text: 'Carnitas jugosas y servicio impecable.' }
        ]
      },
      {
        id: 'p9',
        ownerUserId: 'u_provider_demo',
        name: 'Birria y Barbacoa Los Altos',
        specialty: 'Birria y barbacoa',
        rating: 4.6,
        badges: ['Especialidad', 'Verificado'],
        basePrice: 240,
        coverRadiusKm: 16,
        yearsActive: 11,
        avgResponseHours: 3,
        serviceArea: 'CDMX y Toluca',
        address: 'Toluca Centro, Edo. Méx.',
        lat: 19.292,
        lng: -99.653,
        photos: DEFAULT_TAQUIZA_PHOTOS,
        description: 'Birria y barbacoa para eventos con consomé, tortillas recién hechas y guarniciones tradicionales.',
        packages: [
          { id: 'pk1', title: '30 personas', price: 7800 },
          { id: 'pk2', title: '60 personas', price: 13500 },
          { id: 'pk3', title: '100 personas', price: 21000 }
        ],
        reviews: [
          { id: 'r1', author: 'Luis', stars: 5, text: 'Sabor auténtico y excelente presentación.' },
          { id: 'r2', author: 'Fernanda', stars: 4, text: 'Muy cumplidos, el consomé estuvo increíble.' }
        ]
      },
      {
        id: 'p10',
        ownerUserId: 'u_provider_demo',
        name: 'Tacos de Arrachera El Norteño',
        specialty: 'Arrachera y chorizo',
        rating: 4.5,
        badges: ['Parrilla', 'Popular'],
        basePrice: 260,
        coverRadiusKm: 18,
        yearsActive: 10,
        avgResponseHours: 2,
        serviceArea: 'Querétaro y San Juan',
        address: 'San Juan del Río, Qro.',
        lat: 20.389,
        lng: -100.002,
        photos: DEFAULT_PARRILLADA_PHOTOS,
        description: 'Parrilla de arrachera y chorizo con tortillas hechas a mano, salsas y guarniciones.',
        packages: [
          { id: 'pk1', title: '35 personas', price: 9800 },
          { id: 'pk2', title: '70 personas', price: 16500 },
          { id: 'pk3', title: '120 personas', price: 25500 }
        ],
        reviews: [
          { id: 'r1', author: 'Rebeca', stars: 5, text: 'Excelente punto de cocción, todos quedaron felices.' }
        ]
      },
      {
        id: 'p11',
        ownerUserId: 'u_provider_demo',
        name: 'Taquiza Veggie Verde',
        specialty: 'Taquiza vegetariana',
        rating: 4.4,
        badges: ['Veggie', 'Saludable'],
        basePrice: 210,
        coverRadiusKm: 12,
        yearsActive: 6,
        avgResponseHours: 2,
        serviceArea: 'CDMX poniente',
        address: 'Santa Fe, CDMX',
        lat: 19.380,
        lng: -99.220,
        photos: DEFAULT_TAQUIZA_PHOTOS,
        description: 'Opciones vegetarianas con guisos de temporada, salsas frescas y toppings artesanales.',
        packages: [
          { id: 'pk1', title: '25 personas', price: 6500 },
          { id: 'pk2', title: '50 personas', price: 11000 },
          { id: 'pk3', title: '80 personas', price: 16500 }
        ],
        reviews: [
          { id: 'r1', author: 'Diana', stars: 4, text: 'Opciones ricas y bien presentadas.' }
        ]
      },
      {
        id: 'p12',
        ownerUserId: 'u_provider_demo',
        name: 'Parrillada Santa Fe',
        specialty: 'Parrillada premium',
        rating: 4.8,
        badges: ['Premium', 'Verificado'],
        basePrice: 320,
        coverRadiusKm: 20,
        yearsActive: 8,
        avgResponseHours: 3,
        serviceArea: 'Santa Fe y zonas cercanas',
        address: 'Santa Fe, CDMX',
        lat: 19.359,
        lng: -99.272,
        photos: DEFAULT_PARRILLADA_PHOTOS,
        description: 'Parrillada premium con montaje elegante, personal incluido y menú personalizado.',
        packages: [
          { id: 'pk1', title: '40 personas', price: 16000 },
          { id: 'pk2', title: '80 personas', price: 28000 },
          { id: 'pk3', title: '120 personas', price: 39000 }
        ],
        reviews: [
          { id: 'r1', author: 'Gabriela', stars: 5, text: 'Servicio impecable y montaje espectacular.' },
          { id: 'r2', author: 'Andrés', stars: 5, text: 'Calidad premium, súper recomendable.' }
        ]
      }
    ],
    requests: [],
    favoritesByUser: {
      // userId -> providerIds[]
    }
  }
  localStorage.setItem(DB_KEY, JSON.stringify(seed))
  return seed
}

function writeDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db))
}

function delay(ms = 250) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function haversineKm(a, b) {
  const R = 6371
  const dLat = (b.lat - a.lat) * Math.PI / 180
  const dLng = (b.lng - a.lng) * Math.PI / 180
  const sa = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(sa), Math.sqrt(1 - sa))
  return R * c
}

export const api = {
  auth: {
    async login({ email, password }) {
      await delay()
      const db = readDB()
      const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
      if (!user) throw new Error('Credenciales inválidas')
      return { user: { id: user.id, role: user.role, name: user.name, email: user.email } }
    },
    async register({ role, name, email, password }) {
      await delay()
      const db = readDB()
      if (db.users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('Ese correo ya está registrado')
      }
      const newUser = { id: uid('u'), role, name, email, password }
      db.users.push(newUser)
      // Si es proveedor, crear proveedor base
      if (role === 'provider') {
        db.providers.push({
          id: uid('p'),
          ownerUserId: newUser.id,
          name: name || 'Nuevo Taquero',
          specialty: 'Taquiza',
          rating: 0,
          badges: [],
          basePrice: 0,
          coverRadiusKm: 10,
          lat: 19.4326,
          lng: -99.1332,
          photos: [],
          description: '',
          packages: [],
          reviews: []
        })
      }
      writeDB(db)
      return { user: { id: newUser.id, role: newUser.role, name: newUser.name, email: newUser.email } }
    }
  },

  providers: {
    async list({ location, q, filters }) {
      await delay()
      const db = readDB()
      let items = [...db.providers]

      if (q) {
        const qq = q.toLowerCase()
        items = items.filter(p =>
          p.name.toLowerCase().includes(qq) ||
          p.specialty.toLowerCase().includes(qq)
        )
      }

      // filtros básicos
      if (filters?.minRating) items = items.filter(p => p.rating >= filters.minRating)
      if (filters?.maxBasePrice) items = items.filter(p => p.basePrice <= filters.maxBasePrice)
      if (filters?.specialty) {
        const s = filters.specialty.toLowerCase()
        items = items.filter(p => p.specialty.toLowerCase().includes(s))
      }

      if (location?.lat != null && location?.lng != null) {
        items = items
          .map(p => ({ ...p, distanceKm: haversineKm(location, { lat: p.lat, lng: p.lng }) }))
          .sort((a, b) => (a.distanceKm ?? 0) - (b.distanceKm ?? 0))
      }

      return { providers: items }
    },
    async getById(id) {
      await delay()
      const db = readDB()
      const provider = db.providers.find(p => p.id === id)
      if (!provider) throw new Error('Proveedor no encontrado')
      return { provider }
    },

    async getByOwner(ownerUserId) {
      await delay()
      const db = readDB()
      const provider = db.providers.find(p => p.ownerUserId === ownerUserId)
      if (!provider) throw new Error('Proveedor no encontrado para este usuario')
      return { provider }
    },

    async getByOwner(ownerUserId) {
      await delay()
      const db = readDB()
      const provider = db.providers.find(p => p.ownerUserId === ownerUserId)
      if (!provider) throw new Error('Proveedor no encontrado para este usuario')
      return { provider }
    },

    async updateByOwner({ ownerUserId, patch }) {
      await delay()
      const db = readDB()
      const idx = db.providers.findIndex(p => p.ownerUserId === ownerUserId)
      if (idx < 0) throw new Error('Proveedor no encontrado para este usuario')
      db.providers[idx] = { ...db.providers[idx], ...patch }
      writeDB(db)
      return { provider: db.providers[idx] }
    }
  },

  requests: {
    async create({ clientUserId, providerId, payload }) {
      await delay()
      const db = readDB()
      const provider = db.providers.find(p => p.id === providerId)
      if (!provider) throw new Error('Proveedor no encontrado')

      const req = {
        id: uid('req'),
        clientUserId,
        providerId,
        providerName: provider.name,
        status: 'Pendiente', // Pendiente|Aceptado|Rechazado|Completado
        createdAt: new Date().toISOString(),
        ...payload,
        rejectionReason: ''
      }
      db.requests.unshift(req)
      writeDB(db)
      return { request: req }
    },

    async listForUser({ userId, role }) {
      await delay()
      const db = readDB()
      let requests = []
      if (role === 'client') requests = db.requests.filter(r => r.clientUserId === userId)
      if (role === 'provider') {
        // provider by owner
        const provider = db.providers.find(p => p.ownerUserId === userId)
        if (!provider) return { requests: [] }
        requests = db.requests.filter(r => r.providerId === provider.id)
      }
      return { requests }
    },

    async updateStatus({ requestId, status, rejectionReason }) {
      await delay()
      const db = readDB()
      const idx = db.requests.findIndex(r => r.id === requestId)
      if (idx < 0) throw new Error('Solicitud no encontrada')
      db.requests[idx] = { ...db.requests[idx], status, rejectionReason: rejectionReason || '' }
      writeDB(db)
      return { request: db.requests[idx] }
    }
  },

  favorites: {
    async toggle({ userId, providerId }) {
      await delay(120)
      const db = readDB()
      const arr = db.favoritesByUser[userId] || []
      const exists = arr.includes(providerId)
      const next = exists ? arr.filter(id => id !== providerId) : [...arr, providerId]
      db.favoritesByUser[userId] = next
      writeDB(db)
      return { favorites: next }
    },

    async list({ userId }) {
      await delay(120)
      const db = readDB()
      const ids = db.favoritesByUser[userId] || []
      const providers = db.providers.filter(p => ids.includes(p.id))
      return { favorites: ids, providers }
    }
  }
}
