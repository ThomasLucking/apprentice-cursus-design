import { useNavigate } from 'react-router'
import loginSide from '@/assets/images/login-side.jpg'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useForceLight } from '@/hooks/use-theme'

function MicrosoftLogo() {
  return (
    <svg className="size-5" viewBox="0 0 21 21" aria-hidden="true">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  )
}

/* Connexion: photo left, form right; always light. */
export function Login() {
  const navigate = useNavigate()
  useForceLight()
  return (
    <div className="auth-page">
      <div className="auth-split">
        <aside className="auth-visual">
          <img src={loginSide} alt="Ferme au bord d’un lac suisse, au pied des falaises" className="auth-visual__img" />
          <div className="auth-visual__caption">
            <p className="auth-visual__eyebrow">Apprentice Cursus</p>
            <p className="auth-visual__title">Chaque note est un pas de plus vers le sommet.</p>
            <p className="auth-visual__text">Suivez vos notes, vos moyennes par domaine et votre portfolio, au même endroit.</p>
          </div>
        </aside>
        <section className="auth-panel">
          <div className="w-full max-w-sm">
            <div className="flex flex-col gap-8">
              <div className="auth-head">
                <h1 className="text-2xl font-semibold tracking-tight">Connexion</h1>
                <p className="text-muted-foreground text-sm">Connectez-vous avec votre compte Microsoft Jobtrek.</p>
              </div>
              <Card>
                <CardContent className="flex flex-col gap-6">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      navigate('/apprentice')
                    }}
                  >
                    <Button variant="outline" type="submit" className="auth-ms w-full">
                      <MicrosoftLogo /> Se connecter avec Microsoft
                    </Button>
                  </form>
                </CardContent>
              </Card>
              <p className="auth-panel__foot">© 2026 Jobtrek · Formation professionnelle</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
