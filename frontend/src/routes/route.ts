import Home from '../views/home/Home'
import Tables from '../views/tables/Tables'
import Table from '../views/tables/Table'

const routes = [
  {
    name: 'home',
    path: '/',
    Component: Home
  },
  {
    name: 'tables',
    path: '/tables',
    Component: Tables
  },
  {
    name: 'table',
    path: '/table/:id',
    Component: Table
  }
]

export default routes