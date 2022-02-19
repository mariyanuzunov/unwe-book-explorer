import { useState } from 'react';

import { search } from '../api';

import BookPreview from './BookPreview';
import Search from './Search';
import Spinner from './Spinner';

export default function Explore() {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleSearch(criteria, term) {
    setIsLoading(true);
    search(criteria, term)
      .then(results => {
        setResults(results);
        setIsLoading(false);
      })
      .catch(console.log);
  }

  return (
    <>
      <Search handleSearch={handleSearch} />
      <section className='search-results container'>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {results.length > 0 ? (
              results.map(x => <BookPreview book={x} key={x.id} />)
            ) : (
              <p className='info-msg'>
                You can perform a full or a partial search on different
                criterias, such as <span>title</span>, <span>author</span>,{' '}
                <span>category</span>, or <span>isbn</span>. Come on, give it a
                try!
              </p>
            )}
          </>
        )}
      </section>
    </>
  );
}
