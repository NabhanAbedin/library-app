import { useState, useEffect,  } from "react";
import SearchCatalog from "./searchCatalog";
import {  viewAllAuthors, findAuthorsBySearch  } from "../../api/apiFunctions";
import {motion} from 'framer-motion';


const AuthorsTable = ({authors}) => {
    return (
    <div className="books-table-container">
        <table className="books-table">
            <thead>
                <tr>
                    <th>Author</th>
                    <th>Bio</th>
                    <th>Age</th>

                </tr>
            </thead>
            <tbody>
                {authors.map(authors => (
                    <tr key={authors.id}>
                        <td className="book-title-cell">{authors.name}</td>
                        <td className="book-author-cell">{authors.bio}</td>
                        <td className="book-genre-cell">
                            <span className="book-genre-tag">{authors.age}</span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

const AuthorsCatalog = () => {
    const [ query, setQuery ] = useState(null);
    const [ data, setData ] = useState(null);
 
    useEffect(()=> {
        console.log("🔍 useEffect fired, query =", query)
        const fetchData = async () => {
            if (!query) {
                const result = await viewAllAuthors();
                setData(result)
                return;
            } 
            const result = await findAuthorsBySearch(query);
            setData(result);
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
            <SearchCatalog setQuery={setQuery} setData={setData}/>
            {data && <AuthorsTable authors={data}/>}
             
        
        </motion.div>
    );
};

export default AuthorsCatalog;
