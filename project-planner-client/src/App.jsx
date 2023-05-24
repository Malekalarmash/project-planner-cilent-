import './App.css'
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route, Routes
} from 'react-router-dom'
import Projects from './pages/Projects';
import Clients from './pages/Clients';
import Tasks from './pages/Tasks';
function App() {
  return (
    // npm create vite@latest

    <Container className='container mt-5 ' >
      <Router>
        <Row >
          <Col sm={3} >
            <NavBar />
          </Col>
          <Col className='d-felx align-items-center ' sm={9} style={{ height: '100%' }}>
            <Routes>
              <Route path="/projects" element={<Projects />} exact>
              </Route>
              <Route path="/clients" element={<Clients />} exact>
              </Route>
              <Route path="/tasks" element={<Tasks />} exact>
              </Route>
            </Routes>
          </Col>
        </Row>
      </Router>
    </Container>





  );
}

export default App;
