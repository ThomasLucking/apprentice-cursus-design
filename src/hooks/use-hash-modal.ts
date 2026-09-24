import { useLocation, useNavigate } from 'react-router'

/* Modal state kept in the URL hash (#ajouter-une-note, #nouveau-projet),
   so links and the gallery can open it directly. */
export function useHashModal(hash: string) {
  const location = useLocation()
  const navigate = useNavigate()
  const open = location.hash === hash
  const setOpen = (next: boolean) =>
    navigate({ pathname: location.pathname, search: location.search, hash: next ? hash : '' }, { replace: true, preventScrollReset: true })
  return [open, setOpen] as const
}
