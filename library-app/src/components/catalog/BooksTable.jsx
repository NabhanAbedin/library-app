import {motion} from 'framer-motion';
import { formatRelease } from '../../api/apiFunctions';

const BooksTable = ({books}) => {
    return (
    <>
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
       <div className="checkout-button">
            <motion.button
            onClick={() => setQuery(text)}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            >checkout</motion.button>
       </div>
    </>
    );
};

export default BooksTable;