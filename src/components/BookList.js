import BookShow from './BookShow';
import useBooksContext from '../hooks/use-books-context';

function BookList() {
    const { books } = useBooksContext();

    // to access context we use same technique
    // we recieving a object so we use destructuring

    const renderedBooks = books.map((book) => {
        return <BookShow key={book.id} book={book} />;
    });

    return (
        <div className='book-list'>
            {renderedBooks}
        </div>
    );
}

export default BookList;