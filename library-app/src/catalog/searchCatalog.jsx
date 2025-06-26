import { useState } from "react";
import {motion} from 'framer-motion';


const SearchCatalog = ({setQuery}) => {
    const [text, setText] = useState('');

    return (
        <div
          className="search-container">
            <input type="text" value={text} onChange={e => setText(e.target.value)}/>
            <motion.button 
            className="search-button" 
            onClick={() => setQuery(text)}
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
            >search</motion.button>
        </div>
    );
};

export default SearchCatalog;