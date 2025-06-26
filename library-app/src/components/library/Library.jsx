import { useState, useEffect } from "react";
import Nav from "../nav";
import '../../Styles/library.css';
import {motion} from 'framer-motion';
import { getBooks } from "../../api/apiFunctions.js";
import BookCard from "./BookCard.jsx";

const Library = () => {
    const [ books, setBooks ] = useState(null);

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const result = await getBooks();
                console.log(result)
                setBooks(result);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    },[])

    return (
        <>
            <Nav/>
            <motion.div 
            className="library-header"
            initial={{opacity: 0, y: 0}}
            animate={{opacity: 1, y: 40}}
            transition={{
                type: "spring",
                stiffness: 50,
                damping: 12
              }}
            >
                <h1>Our Library</h1>
            </motion.div>
            {books && (
              <div className="books-grid">
                {books.map(book => (
                  <BookCard
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author_id={book.author_id}
                    genre_id={book.genre_id}
                    release={book.release}
                  />
                ))}
              </div>
            )}
        </>

    )
};

export default Library;