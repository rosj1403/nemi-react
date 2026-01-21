import { useEffect, useState } from 'react'

export function useGeolocation() {
  const [status, setStatus] = useState('idle') // idle|loading|granted|denied|error
  const [coords, setCoords] = useState(null) // {lat,lng}
  const [error, setError] = useState('')

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setStatus('error')
      setError('Tu navegador no soporta geolocalización')
      return
    }
    setStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        setStatus('granted')
      },
      (e) => {
        // denegado o error
        setStatus(e.code === 1 ? 'denied' : 'error')
        setError(e.message || 'No se pudo obtener ubicación')
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    )
  }, [])

  return { status, coords, error }
}
