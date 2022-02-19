import { useNavigate } from 'react-router-dom';

export default function FeaturedBookList({ listTitle, books }) {
  return (
    <section className='book-list'>
      <h4 className='book-list-title'>{listTitle}</h4>
      {books.map(book => (
        <FeaturedBook book={book} key={book.id} />
      ))}
    </section>
  );
}

function FeaturedBook({ book }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/details/${book.id}`);
  }

  return (
    <article className='book-sm' onClick={handleClick}>
      <p className='book-sm-title'>{book.title}</p>
      <div className='book-sm-image-container'>
        <img src={book.imageUrl} alt='' className='book-sm-image' />
      </div>
      <p className='book-sm-author'>by {book.authors}</p>
    </article>
  );
}
