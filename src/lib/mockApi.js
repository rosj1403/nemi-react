// Mock API para simular endpoints tipo MockAPI/Postman.
// Persistencia: localStorage.

const DB_KEY = 'nemi_db_v1'

function uid(prefix = 'id') {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`
}

function readDB() {
  const raw = localStorage.getItem(DB_KEY)
  if (raw) {
    try { return JSON.parse(raw) } catch { /* ignore */ }
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
        badges: ['Destacado'],
        basePrice: 150,
        coverRadiusKm: 15,
        // coordenadas demo CDMX centro
        lat: 19.4326,
        lng: -99.1332,
        photos: [],
        description: 'Taquizas a domicilio con guarniciones y salsas. Atención para eventos sociales.',
        packages: [
          { id: 'pk1', title: '50 personas', price: 7500 },
          { id: 'pk2', title: '100 personas', price: 14000 }
        ],
        reviews: [
          { id: 'r1', author: 'María', stars: 5, text: 'Muy buen servicio y puntuales.' }
        ]
      },
      {
        id: 'p2',
        ownerUserId: 'u_provider_demo',
        name: 'Parrilladas Norteñas',
        specialty: 'Parrillada',
        rating: 4.6,
        badges: ['Verificado'],
        basePrice: 220,
        coverRadiusKm: 20,
        lat: 19.40,
        lng: -99.16,
        photos: [],
        description: 'Parrilladas con cortes y opciones vegetarianas. Montaje y personal incluidos.',
        packages: [
          { id: 'pk1', title: '30 personas', price: 9000 },
          { id: 'pk2', title: '80 personas', price: 20000 }
        ],
        reviews: []
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
