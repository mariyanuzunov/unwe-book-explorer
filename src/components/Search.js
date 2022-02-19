import { useRef } from 'react';

export default function Search({ handleSearch }) {
  const criteriaRef = useRef();
  const searchTermRef = useRef();

  function handleClick() {
    const criteria = criteriaRef.current.value;
    const term = searchTermRef.current.value;

    if (term) {
      handleSearch(criteria, term);
    }
  }

  return (
    <section className='search'>
      <section className='container'>
        <div className='animate__bounceInLeft'>
          <select ref={criteriaRef} className='search-select'>
            <option value='intitle'>Title</option>
            <option value='inauthor'>Author</option>
            <option value='subject'>Category</option>
            <option value='isbn'>ISBN</option>
          </select>
          <input
            type='text'
            placeholder='Select a criteria and enter a serch term...'
            ref={searchTermRef}
            className='search-input'
          />
          <button onClick={handleClick} className='search-btn'>
            Search
          </button>
        </div>
      </section>
    </section>
  );
}
