import { createContext, useState, useCallback } from "react";
import axios from 'axios';

const BooksContext = createContext();

// we cerating new component with children prop. We want change content on the screen so we need our state system
function Provider({ children }) {

    const [books, setBooks] = useState([]);

    // using useCallback Hook to fix issue with useEffect. We are wrapping the whole fucntion in useCallback fcuntion
    const fetchBooks = useCallback(async () => {
        const response = await axios.get('http://localhost:3001/books');

        setBooks(response.data);
    }, []);


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

    const valueToShare = {
        books,
        deleteBookById,
        editBookById,
        createBook,
        fetchBooks
    };
    
    return (
        <BooksContext.Provider value={valueToShare}>
            {/*under children is our app component*/}
            {children}
        </BooksContext.Provider>
    ); 
}

// to export a second component we use named export
// to import: import BooksContext, { Provider } from '/./a.sdg'
export {Provider};
export default BooksContext;