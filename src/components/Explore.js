import { useState, useRef } from 'react';

import { search } from '../api';

import BookPreview from './BookPreview';

export default function Explore() {
  const criteriaRef = useRef();
  const searchTermRef = useRef();
  const [results, setResults] = useState([]);

  function handleSearch() {
    const criteria = criteriaRef.current.value;
    const term = searchTermRef.current.value;

    if (term) {
      search(criteria, term).then(setResults);
    }
  }

  return (
    <>
      <section className='search'>
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
        <button onClick={handleSearch} className='search-btn'>
          Search
        </button>
      </section>
      <section className='search-results'>
        {results.map(x => (
          <BookPreview book={x} key={x.id} />
        ))}
      </section>
    </>
  );
}
