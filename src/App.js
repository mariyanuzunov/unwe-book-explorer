import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Explore from './components/Explore';

import './App.css';

function App() {
  console.log(process.env.REACT_APP_API_KEY);
  return (
    <BrowserRouter>
      <Header />
      <main className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
