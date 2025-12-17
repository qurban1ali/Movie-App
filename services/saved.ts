// Lightweight cross-platform saved-movies storage.
// Uses localStorage on web if available, otherwise attempts AsyncStorage.
const STORAGE_KEY = "SAVED_MOVIES_V1"

async function _getStorage() {
  if (typeof window !== "undefined" && window.localStorage) {
    return {
      getItem: async (k: string) => window.localStorage.getItem(k),
      setItem: async (k: string, v: string) => window.localStorage.setItem(k, v),
      removeItem: async (k: string) => window.localStorage.removeItem(k),
    }
  }

  try {
    // Try to dynamically require AsyncStorage for native
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const AsyncStorage = require("@react-native-async-storage/async-storage").default
    return AsyncStorage
  } catch (e) {
    // Fallback to in-memory store (will not persist between app restarts)
    let mem: Record<string, string> = {}
    return {
      getItem: async (k: string) => mem[k] ?? null,
      setItem: async (k: string, v: string) => { mem[k] = v },
      removeItem: async (k: string) => { delete mem[k] },
    }
  }
}

export async function getSavedMovies(): Promise<any[]> {
  try {
    const store = await _getStorage()
    const raw = await store.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch (e) {
    console.warn("getSavedMovies error", e)
    return []
  }
}

export async function saveMovie(movie: any) {
  try {
    const store = await _getStorage()
    const list = await getSavedMovies()
    const exists = list.find((m) => m.id === movie.id)
    if (exists) return
    list.unshift(pickMovie(movie))
    await store.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch (e) {
    console.warn("saveMovie error", e)
  }
}

export async function removeMovie(id: number | string) {
  try {
    const store = await _getStorage()
    const list = await getSavedMovies()
    const next = list.filter((m) => String(m.id) !== String(id))
    await store.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch (e) {
    console.warn("removeMovie error", e)
  }
}

export async function isMovieSaved(id: number | string) {
  try {
    const list = await getSavedMovies()
    return list.some((m) => String(m.id) === String(id))
  } catch (e) {
    return false
  }
}

function pickMovie(movie: any) {
  return {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
  }
}

export default {
  getSavedMovies,
  saveMovie,
  removeMovie,
  isMovieSaved,
}
