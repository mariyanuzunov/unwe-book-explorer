import { normalize } from './utilities';

const URL = 'https://www.googleapis.com/books/v1/volumes/';
const FIELDS_FEATURED =
  '?fields=(id,volumeInfo(title,subtitle,authors,imageLinks/thumbnail))';

const FIELDS_SEARCH =
  '?fields=totalItems,items(id,volumeInfo(title,subtitle,authors,description,averageRating,ratingsCount,imageLinks/thumbnail))';

const API_KEY = `&key=${process.env.REACT_APP_API_KEY}`;

// TODO: Refactor api calls

export async function get2021BestSellers() {
  const ids = [
    'nNjTDwAAQBAJ',
    'Ed8nEAAAQBAJ',
    'Kn4eEAAAQBAJ',
    'yqksEAAAQBAJ',
    'sqVPEAAAQBAJ',
  ];

  const batch = ids.map(id => fetch(URL + id + FIELDS_FEATURED));

  const responses = await Promise.all(batch);
  const data = await Promise.all(responses.map(res => res.json()));
  return normalize(data);
}

export async function getAllTimeBestSellers() {
  const ids = [
    'wT8817AhkMAC',
    'FzfIrQEACAAJ',
    '2jg9DwAAQBAJ',
    'KbC_uQAACAAJ',
    'FzVjBgAAQBAJ',
  ];

  const batch = ids.map(id => fetch(URL + id + FIELDS_FEATURED));

  const responses = await Promise.all(batch);
  const data = await Promise.all(responses.map(res => res.json()));
  return normalize(data);
}

export async function getMustRead() {
  const ids = [
    'B1hSG45JCX4C',
    '5NomkK4EV68C',
    'AJ4REAAAQBAJ',
    'PGR2AwAAQBAJ',
    'Xfze51E7TEoC',
  ];

  const batch = ids.map(id => fetch(URL + id + FIELDS_FEATURED));

  const responses = await Promise.all(batch);
  const data = await Promise.all(responses.map(res => res.json()));
  return normalize(data);
}

// Search

export async function search(criteria, searchTerm) {
  const adr = URL + FIELDS_SEARCH + `&q=${criteria}:${searchTerm}` + API_KEY;

  const res = await fetch(adr);
  const data = await res.json();

  let items = data.items.map(book => {
    const id = book.id;
    const { volumeInfo: data } = book;

    if (
      !id ||
      !data.title ||
      !data.authors ||
      data.authors.length < 0 ||
      !data.description
    ) {
      return null;
    }

    const title = data.subtitle
      ? `${data.title}: ${data.subtitle}`
      : data.title;

    const authors =
      data.authors?.length > 1 ? data.authors.join(', ') : data.authors[0];

    const shortDescription = data.description?.substring(0, 300) + '...';

    const imageUrl = data.imageLinks?.thumbnail
      ? data.imageLinks?.thumbnail
      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Placeholder_book.svg/464px-Placeholder_book.svg.png';

    const rating = data.averageRating || 0;
    const totalVotes = data.ratingsCount || 0;

    return {
      id,
      title,
      authors,
      shortDescription,
      imageUrl,
      rating,
      totalVotes,
    };
  });

  return items.filter(x => x !== null);
}
