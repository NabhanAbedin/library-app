import { useState, useEffect, useCallback } from "react";
import SearchCatalog from "./searchCatalog";
import { viewAllBooks, formatRelease } from "../api/apiFunctions";
import {motion} from 'framer-motion';



const BooksTable = ({books}) => {
    return (
    <div className="books-table-container">
        <table className="books-table">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>Release Date</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <tr key={book.id}>
                        <td className="book-title-cell">{book.book_title}</td>
                        <td className="book-author-cell">{book.author_name}</td>
                        <td className="book-genre-cell">
                            <span className="book-genre-tag">{book.genre_type}</span>
                        </td>
                        <td className="book-release-cell">{formatRelease(book.release)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

const BooksCatalog = () => {
    const [ query, setQuery ] = useState(null);
    const [ data, setData ] = useState(null);
 
    useEffect(()=> {
        const fetchData = async () => {
            if (!query) {
                const result = await viewAllBooks();
                setData(result)
            } 
            //const result = await findBySearch(query);
            //setData(result);
        };
     fetchData();
    },[query])

    return (
        <motion.div 
        className="books-catalog-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            <SearchCatalog setQuery={setQuery}/>
            {data && <BooksTable books={data}/>}
             
        
        </motion.div>
    );
};

export default BooksCatalog;

