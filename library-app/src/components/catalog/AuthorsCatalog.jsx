import { useState, useEffect,  } from "react";
import SearchCatalog from "./searchCatalog";
import {  viewAllAuthors, findAuthorsBySearch  } from "../../api/apiFunctions";
import {motion} from 'framer-motion';
import Filter from "./Filter";


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
    const [filterData, setFilterData] = useState({
        sortBy: 'books',
        orderBy: 'descending',
        from: null,
        to: null
    });
 
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

    useEffect(()=> {
        
        const fetchData = async () => {
            try {
                const result = await catalogBooks(filterData);
                console.log(result)
                setData(result);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    },[filterData])

    return (
        <motion.div 
        className="books-catalog-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            <SearchCatalog setQuery={setQuery} setData={setData}/>
            <Filter filterData={filterData} setFilterData={setFilterData}/>
            {data && <AuthorsTable authors={data}/>}
             
        
        </motion.div>
    );
};

export default AuthorsCatalog;
