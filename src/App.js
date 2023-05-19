import { useEffect } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
import useBooksContext from './hooks/use-books-context';

function App() {
    const { fetchBooks } = useBooksContext();

    useEffect(() => {
        fetchBooks();
        // second argument controls whether or not the function will called on second third etc. render
        // there are 3 options: 
        // 1: with second argument as [], we call after first render and never again
        // 2: with no second argument, we call after first render and after every next one
        // 3: with second argument as [counter], we call after first render and also called after rerenders if 'counter' variable changed
    }, [fetchBooks]);

    // DONT DO THIS:
    // fetchBooks(); Lektion: 123

    return (
        <div className='app'>
            <h1>Reading List</h1>
            <BookList  />
            <BookCreate  />
        </div>
    );
}

export default App;