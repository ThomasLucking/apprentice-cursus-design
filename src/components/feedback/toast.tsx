import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { GlyphCheck } from '@/components/icons'

type Toast = { id: number; message: string }

const ToastContext = createContext<(message: string) => void>(() => {})

export function useToast() {
  return useContext(ToastContext)
}

function ToastItem({ toast, onDone }: { toast: Toast; onDone: (id: number) => void }) {
  const [on, setOn] = useState(false)

  useEffect(() => {
    const raf = requestAnimationFrame(() => setOn(true))
    const hide = setTimeout(() => setOn(false), 2600)
    const remove = setTimeout(() => onDone(toast.id), 2800)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(hide)
      clearTimeout(remove)
    }
  }, [onDone, toast.id])

  return (
    <div className={on ? 'toast is-on' : 'toast'} role="status">
      <GlyphCheck />
      {toast.message}
    </div>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const show = useCallback((message: string) => {
    setToasts((t) => [...t, { id: Date.now() + Math.random(), message }])
  }, [])
  const remove = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), [])

  return (
    <ToastContext.Provider value={show}>
      {children}
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDone={remove} />
      ))}
    </ToastContext.Provider>
  )
}
