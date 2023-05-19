import { useState } from 'react';
import useBooksContext from '../hooks/use-books-context';


function BookCreate() {
    const [title, setTitle] = useState('');
    //The code here "setTitle(...) is meant to show what user just typed and we want to use it to update our title piece of state"
    const { createBook } = useBooksContext();

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createBook(title);
        setTitle('');
    };

    return (
        <div className='book-create'>
            <h3>Add a Book</h3>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input className='input' value={title} onChange={handleChange} />
                <button className='button'>Create!</button>
            </form>
        </div>
    );
}

export default BookCreate;