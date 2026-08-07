export interface SiteNavChild {
  label: string
  to: string
  color?: string
}

export interface SiteNavItem {
  id: string
  label: string
  to?: string
  children?: SiteNavChild[]
}

const siteNavigation: SiteNavItem[] = [
  {
    id: 'descubre',
    label: 'Descubre',
    children: [
      { label: 'Acerca de los institutos', to: '/acerca-de-institutos' },
      { label: 'Nuestros campus', to: '/campus' },
      { label: 'Escuela para padres', to: '/escuela-padres' },
      { label: 'Convenios IECS-IEDIS', to: '/convenios' },
      { label: 'Voluntarios IECS-IEDIS', to: '/voluntarios' },
    ],
  },
  {
    id: 'niveles',
    label: 'Niveles',
    children: [
      { label: 'Desarrollo Infantil', to: '/daycare', color: '#8EC152' },
      { label: 'Preescolar', to: '/preschool', color: '#E83F4B' },
      { label: 'Primaria', to: '/elementary-school', color: '#FCBF2C' },
      { label: 'Secundaria', to: '/middle-school', color: '#66A8D8' },
    ],
  },
  { id: 'talleres-inteligentes', label: 'Talleres Inteligentes', to: '/talleres-inteligentes' },
  { id: 'vida-husky', label: 'Vida Husky', to: '/vida-husky' },
  { id: 'blog-iecs-iedis', label: 'Blog IECS-IEDIS', to: '/blog-iecs-iedis' },
]

export const useSiteNavigation = () => siteNavigation
