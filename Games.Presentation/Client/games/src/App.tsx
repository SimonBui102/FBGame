import { Outlet, useLocation } from 'react-router-dom';
import './App.css'
import GameTable from './components/GameTable'
import { Container } from 'semantic-ui-react';

function App() {
    const location = useLocation();

  return (
    <>
          {location.pathname === '/' ? <GameTable /> : (
              <Container className="container-style">
                  <Outlet>

                  </Outlet>
              </Container>
          
          )}
    </>
  )
}

export default App
