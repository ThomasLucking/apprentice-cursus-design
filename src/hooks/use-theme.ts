import { useLayoutEffect, useSyncExternalStore } from 'react'

/* Appearance is the `dark` class on <html>, stored in localStorage.appearance
   (applied before first paint by the inline script in index.html). */
const listeners = new Set<() => void>()

function isDark() {
  return document.documentElement.classList.contains('dark')
}

export function setDark(dark: boolean) {
  document.documentElement.classList.toggle('dark', dark)
  try {
    localStorage.setItem('appearance', dark ? 'dark' : 'light')
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l())
}

export function useTheme() {
  const dark = useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    isDark,
  )
  return { dark, toggle: () => setDark(!isDark()) }
}

/* Screens that are always light (login): drop the `dark` class while mounted. */
export function useForceLight() {
  useLayoutEffect(() => {
    const root = document.documentElement
    const wasDark = root.classList.contains('dark')
    root.classList.remove('dark')
    return () => {
      root.classList.toggle('dark', wasDark)
    }
  }, [])
}
