import { useRoutes } from 'react-router-dom'

import { Home } from './pages/Home'
import { EditContact } from './pages/EditContact'
import { NewContact } from './pages/NewContact'

export function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/new',
      element: <NewContact />
    },
    {
      path: '/edit/:id',
      element: <EditContact />
    }
  ])
  return routes
}
