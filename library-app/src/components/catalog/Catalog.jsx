import Nav from "../nav";
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import { useState } from "react";
import BooksCatalog from "./BooksCatalog";
import '../../Styles/catalog.css';

const Catalog = () => {
    const [ selected, setSelected ] = useState(null);

    const renderComponent = () => {
        if (selected === 'books') return <BooksCatalog />
    }

    return (
        <>
            <Nav />
            <motion.div 
            className="catalog-header"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}>
                <h1>View our growing catalog!</h1>
                <p>search authors, specfic books, by genre and more!</p>
            </motion.div>
            <motion.div 
            className="select-container"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 30 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            >
                <button onClick={()=> setSelected('books')} style={selected === 'books' ? { textDecoration: 'underline' } : {}}>Books</button>
                <button onClick={()=> setSelected('authors')} style={selected === 'authors' ? { textDecoration: 'underline' } : {}}>Authors</button>
                <button onClick={()=> setSelected('genres')} style={selected === 'genres' ? { textDecoration: 'underline' } : {}}>Genres</button>
            </motion.div>
            {renderComponent()}
        </>
    )
};

export default Catalog;