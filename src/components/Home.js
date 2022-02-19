import { useEffect, useState } from 'react';
import { getBookShelf } from '../api';

import Hero from './Hero';
import FeaturedBookList from './FeaturedBookList';
import Spinner from './Spinner';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [shelves, setShelves] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getBookShelf()
      .then(shelves => {
        setIsLoading(false);
        setShelves(shelves);
      })
      .catch(console.log);
  }, []);

  function renderShelves() {
    if (isLoading) {
      return <Spinner />;
    }

    const SHELF_NAMES = [
      '2021 Best Sellers',
      'All Time Best Sellers',
      'Must Read',
    ];

    return shelves.map((x, id) => (
      <FeaturedBookList books={x} listTitle={SHELF_NAMES[id]} key={x.id} />
    ));
  }

  return (
    <>
      <Hero />
      {renderShelves()}
    </>
  );
}
