import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Explore from './components/Explore';
import Details from './components/BookDetails';
import Footer from './components/Footer';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main id='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/details/:id' element={<Details />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
