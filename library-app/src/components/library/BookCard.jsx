import { useEffect, useState } from "react";
import {motion} from 'framer-motion';
import { formatRelease } from "../../api/apiFunctions";

const BookCard = ({id, title, author_id, genre_id, release}) => {

    return (
        <motion.div
            className="book-card-container"
            initial={{ rotateY: 180, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <h3>{title}</h3>
            <p>{formatRelease(release)}</p>
        </motion.div>
    );
};

export default BookCard;