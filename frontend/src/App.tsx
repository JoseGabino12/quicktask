import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';

import { Toaster } from 'sonner'

import routes from './routes/route';
import './App.css';

function App () {
  return (
    <Router>
      <Nav />
      <Routes>
        { routes.map(({ path, Component }) => (
          <Route key={ path } path={ path } element={ <Component /> } />
        )) }
      </Routes>
      <Toaster position="bottom-right" richColors />
    </Router>
  )
}

export default App
