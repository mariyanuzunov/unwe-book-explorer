import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className='hero'>
      <section className='container'>
        <h1 className='hero-text'>Your online library! Everywhere. Enytime.</h1>
        <button className='hero-btn' onClick={() => navigate('/explore')}>
          <i className='fa-solid fa-magnifying-glass hero-btn-icon'></i>
          Click here and start exploring!
        </button>
      </section>
    </section>
  );
}
