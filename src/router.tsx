import { createBrowserRouter, Navigate } from 'react-router'
import { AppLayout } from '@/components/layout/app-layout'
import { ApprenticeGrade, GradeCreate } from '@/pages/apprentice/grade-pages'
import { GradesDashboard } from '@/pages/apprentice/grades'
import { ApprenticeHome } from '@/pages/apprentice/home'
import { Portfolio, ProjectPage } from '@/pages/apprentice/portfolio-pages'
import { PortfolioPreview } from '@/pages/apprentice/portfolio-preview'
import { CoachApprentice, CoachGrade } from '@/pages/coach/apprentice'
import { Apprentices } from '@/pages/coach/apprentices'
import { CoachHome, GradeNotFound } from '@/pages/coach/home'
import { Gallery } from '@/pages/gallery'
import { Login } from '@/pages/login'

export const router = createBrowserRouter([
  { path: '/', element: <Gallery /> },
  { path: '/login', element: <Login /> },
  { path: '/apprentice/portfolio/preview', element: <PortfolioPreview /> },
  {
    path: '/apprentice',
    element: <AppLayout role="apprentice" />,
    children: [
      { index: true, element: <ApprenticeHome /> },
      { path: 'grades', element: <GradesDashboard /> },
      { path: 'grades/create', element: <GradeCreate mode="notes" /> },
      { path: 'grades/create/modules', element: <GradeCreate mode="modules" /> },
      { path: 'grades/:gradeId', element: <ApprenticeGrade /> },
      { path: 'portfolio', element: <Portfolio /> },
      { path: 'portfolio/empty', element: <Portfolio empty /> },
      { path: 'portfolio/create', element: <ProjectPage /> },
      { path: 'portfolio/edit', element: <ProjectPage edit /> },
    ],
  },
  {
    path: '/coach',
    element: <AppLayout role="coach" />,
    children: [
      { index: true, element: <CoachHome /> },
      { path: 'apprentices', element: <Apprentices /> },
      { path: 'apprentices/:apprenticeId', element: <CoachApprentice /> },
      { path: 'apprentices/:apprenticeId/grades/:gradeId', element: <CoachGrade /> },
      { path: 'grade-not-found', element: <GradeNotFound /> },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
])
