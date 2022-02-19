import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../api';

import Spinner from './Spinner';

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getBookById(id)
      .then(book => {
        setIsLoading(false);
        setBook(book);
      })
      .catch(console.log);
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <article className='book-container wrap pb-16'>
          <section className='image-container'>
            <img src={book.imageUrl} className='book-thumbnail' />
          </section>
          <section className='book-details '>
            <span className='book-title pill'>{book.title}</span>
            <p>
              Author:<span className='pill'>{book.authors}</span>
            </p>

            <p>
              Publisher: <span className='pill'>{book.publisher}</span> | Date:{' '}
              <span className='pill'>{book.publishedDate}</span>
            </p>
            <p>
              Pages: <span className='pill'>{book.pageCount}</span> | Language:{' '}
              <span className='pill'>{book.language}</span> | ISBN:{' '}
              <span className='pill'>{book.isbn}</span>
            </p>
            <p>
              Rating:
              <span className='pill'>
                <b>{book.rating}</b>/5 ({book.totalVotes} гласа)
              </span>
            </p>
            <p></p>
          </section>

          <section className='book-categories'>
            Category:
            <pre className='pill'>{book.categories}</pre>
          </section>

          <section className='book-description'>
            Description:
            <article
              className='pill'
              // DON'T DO THIS AT HOME!
              dangerouslySetInnerHTML={{ __html: book.description }}
            >
              {/* {book.description} */}
            </article>
          </section>
        </article>
      )}
    </>
  );
}
