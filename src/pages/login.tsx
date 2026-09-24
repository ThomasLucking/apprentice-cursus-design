import { useNavigate } from 'react-router'
import loginSide from '@/assets/images/login-side.jpg'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
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

/* Connexion: full-screen photo with a floating login card; always light. */
export function Login() {
  const navigate = useNavigate()
  useForceLight()
  return (
    <div className="auth-page">
      <img src={loginSide} alt="Ferme au bord d’un lac suisse, au pied des falaises" className="auth-bg" />
      <div className="auth-caption">
        <p className="auth-caption__eyebrow">Apprentice Cursus</p>
        <p className="auth-caption__title">Chaque note est un pas de plus vers le sommet.</p>
        <p className="auth-caption__text">Suivez vos notes, vos moyennes par domaine et votre portfolio, au même endroit.</p>
      </div>
      <Card className="auth-card">
        <CardHeader>
          <CardTitle className="text-2xl tracking-tight">Connexion</CardTitle>
          <CardDescription>Connectez-vous avec votre compte Microsoft Jobtrek.</CardDescription>
        </CardHeader>
        <CardContent>
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
        <CardFooter>
          <p className="auth-card__foot">© 2026 Jobtrek · Formation professionnelle</p>
        </CardFooter>
      </Card>
    </div>
  )
}
