import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WithSubnavigation from './components/navbar/Nav';

import { Toaster } from 'sonner'

import routes from './routes/route';
import './App.css';

function App() {
  return (
    <Router>
      <WithSubnavigation />
      <Routes>
        { routes.map(({ path, Component }) => (
          <Route key={ path } path={ path } element={ <Component /> } />
        )) }
      </Routes>
      <Toaster position="top-right" richColors />
    </Router>
  )
}

export default App
