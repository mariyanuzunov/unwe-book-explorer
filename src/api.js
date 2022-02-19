import { normalize } from './utilities';

const URL = 'https://www.googleapis.com/books/v1/volumes/';

const FIELDS_SEARCH =
  '?fields=totalItems,items(id,volumeInfo(title,subtitle,authors,description,averageRating,ratingsCount,imageLinks/thumbnail))';

const API_KEY = `&key=${process.env.REACT_APP_API_KEY}`;

// TODO: Refactor api calls

export async function getBookShelf() {
  const url = `https://www.googleapis.com/books/v1/users/100735580474519719694/bookshelves`;
  const shelfIds = [1001, 1002, 1003];

  const batch = shelfIds.map(id => fetch(`${url}/${id}/volumes`));
  const responses = await Promise.all(batch);

  const data = await Promise.all(
    responses.map(res => {
      if (!res.ok) {
        throw new Error();
      }

      return res.json();
    })
  );

  return data.map(x => normalize(x.items));
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

export async function getBookById(id) {
  const res = await fetch(URL + id);

  if (!res.ok) {
    throw new Error('Oops, something went wrong!');
  }

  const data = await res.json();

  const { volumeInfo } = data;

  const details = {
    id,
    title: volumeInfo.subtitle
      ? `${volumeInfo.title}: ${volumeInfo.subtitle}`
      : volumeInfo.title,

    authors:
      volumeInfo.authors?.length > 1
        ? volumeInfo.authors.join(', ')
        : volumeInfo.authors[0],

    description:
      volumeInfo?.description || 'There is no description of the book.',

    publisher: volumeInfo.publisher,
    publishedDate: volumeInfo.publishedDate,
    categories:
      volumeInfo.categories?.join('\n') || 'There are no specified categories.',
    pageCount: volumeInfo.pageCount,
    language: volumeInfo.language,
    isbn: volumeInfo.industryIdentifiers[0]?.identifier,

    imageUrl: volumeInfo.imageLinks?.thumbnail
      ? volumeInfo.imageLinks?.thumbnail
      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Placeholder_book.svg/464px-Placeholder_book.svg.png',

    rating: volumeInfo.averageRating || 0,
    totalVotes: volumeInfo.ratingsCount || 0,
  };

  return details;
}
