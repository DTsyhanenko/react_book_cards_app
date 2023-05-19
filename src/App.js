import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');

        setBooks(response.data);
    };

    useEffect(() => {
        fetchBooks();
        // second argument controls whether or not the function will called on second third etc. render
        // there are 3 options: 
        // 1: with second argument as [], we call after first render and never again
        // 2: with no second argument, we call after first render and after every next one
        // 3: with second argument as [counter], we call after first render and also called after rerenders if 'counter' variable changed
    }, []);

    // DONT DO THIS:
    // fetchBooks(); Lektion: 123

    const editBookById = async (id, newTitle) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle
        });

        console.log(response);

        const updatedBooks = books.map((book) => {
            if (book.id === id) {
                //we are updating the object by returning a new one, that takes all the existing properties from the book and then puts a new title in
                return { ...book, ...response.data }; // means take all the different properties of that object, take different key value pairs and add them into this new object right here
            }
                // otherwise if we are mapping through other book, that has a different id, then we just return that book
            return book;
        });
        // and now we are updating our state
        setBooks(updatedBooks);
    };

    const deleteBookById = async (id) => {
        await axios.delete(`http://localhost:3001/books/${id}`);

        const updatedBooks = books.filter((book) => {
            return book.id !== id;
        });

        setBooks(updatedBooks);
    };

    const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {
            // title: title is the same as title alone
            title
        });

        const updatedBooks = [...books, response.data];
        setBooks(updatedBooks);
    };

    return (
        <div className='app'>
            <h1>Reading List</h1>
            <BookList onEdit={editBookById} books={books} onDelete={deleteBookById} />
            <BookCreate onCreate={createBook} />
        </div>
    );
}

export default App;