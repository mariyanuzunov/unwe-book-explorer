import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className='app-header'>
      <section className='navbar container'>
        <section>
          <h3 className='title-text'>
            <i className='fa-solid fa-book-open title-icon'></i>
            Book Explorer
          </h3>
        </section>
        <nav>
          <NavLink to='/' className='nav-link'>
            <i className='fa-solid fa-house nav-link-icon'></i>
            Home
          </NavLink>
          <NavLink to='/explore' className='nav-link'>
            <i className='fa-solid fa-magnifying-glass nav-link-icon'></i>
            Explore
          </NavLink>
        </nav>
      </section>
    </header>
  );
}
