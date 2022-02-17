export function normalize(books) {
  return books.map(book => {
    const { volumeInfo } = book;

    return {
      id: book.id,
      title: volumeInfo.title,
      authors:
        volumeInfo.authors.length > 1
          ? volumeInfo.authors.join(', ').substring(0, 20) + '...'
          : volumeInfo.authors[0],
      imageUrl: volumeInfo.imageLinks.thumbnail,
    };
  });
}
