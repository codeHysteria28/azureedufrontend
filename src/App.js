import './App.css';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import SiteBodyCollection from './components/SiteBodyCollection';

function App() {
  return (
    <Container fluid id='main-wrapper'>
      <Header />
      <SiteBodyCollection/>
    </Container>
  );
}

export default App;
