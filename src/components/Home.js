import { useEffect, useState } from 'react';
import Hero from './Hero';
import FeaturedBookList from './FeaturedBookList';

import { get2021BestSellers, getAllTimeBestSellers, getMustRead } from '../api';

export default function Home() {
  const [bestSellers2021List, setBestSellers2021List] = useState([]);
  const [allTimeBestSellers, setAllTimeBestSellers] = useState([]);
  const [mustRead, setMustRead] = useState([]);

  useEffect(() => {
    get2021BestSellers().then(setBestSellers2021List).catch(console.log);
    getAllTimeBestSellers().then(setAllTimeBestSellers).catch(console.log);
    getMustRead().then(setMustRead).catch(console.log);
  }, []);

  return (
    <>
      <Hero />

      <FeaturedBookList
        listTitle='2021 best sellers'
        books={bestSellers2021List}
      />
      <FeaturedBookList
        listTitle='All Time Best Sellers'
        books={allTimeBestSellers}
      />
      <FeaturedBookList listTitle='Must Read' books={mustRead} />
    </>
  );
}
