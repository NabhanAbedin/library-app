import { useState, useEffect } from "react";
import Nav from "../nav";
import '../../Styles/library.css';
import {motion} from 'framer-motion';

const Library = () => {

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
        </>
    )
};

export default Library;