import Home from "../components/home/Home"
import Tables from "../components/tables/Tables"

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
  }
]

export default routes