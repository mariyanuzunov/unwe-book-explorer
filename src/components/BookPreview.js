import { useNavigate } from 'react-router-dom';

export default function BookPreview({ book }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/details/${book.id}`);
  }

  return (
    <article className='book-container' onClick={handleClick}>
      <section className='image-container'>
        <img src={book.imageUrl} className='book-thumbnail' />
      </section>
      <section className='preview-details'>
        <span className='book-title pill'>{book.title}</span>
        <span className='book-authors pill'>{book.authors}</span>
        <span className='book-short-description pill'>
          {book.shortDescription}
        </span>
        <span className='book-rating pill'>
          Rating: <b>{book.rating}</b>/5 ({book.totalVotes} гласа)
        </span>
      </section>
    </article>
  );
}
