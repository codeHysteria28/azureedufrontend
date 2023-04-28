import './App.css';
import Container from 'react-bootstrap/Container';
import SiteBodyCollection from './components/SiteBodyCollection';
import Footer from './components/Footer';

function App() {
  return (
    <Container fluid id='main-wrapper'>
      <SiteBodyCollection/>
      <Footer />
    </Container>
  );
}

export default App;