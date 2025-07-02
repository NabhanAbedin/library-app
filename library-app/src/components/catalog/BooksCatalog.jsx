import { useState, useEffect, useCallback } from "react";
import SearchCatalog from "./searchCatalog";
import { findBySearch, formatRelease, catalogBooks } from "../../api/apiFunctions";
import {motion} from 'framer-motion';
import BooksTable from "./BooksTable";
import Filter from './Filter';


const BooksCatalog = () => {
    const [ query, setQuery ] = useState(null);
    const [ data, setData ] = useState(null);
    const [filterData, setFilterData] = useState({
        sortBy: 'books',
        orderBy: 'descending',
        from: null,
        to: null
    });
    
    //search useEffect
    useEffect(()=> {
        console.log("🔍 useEffect fired, query =", query)
        const fetchData = async () => {
            if (!query) {
                return;
            } 
            const result = await findBySearch(query);
            console.log(result);
            setData(result);
        };
     fetchData();
    },[query])

    //filter useeffect
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
            <div className="catalog-controls">
                <SearchCatalog setQuery={setQuery} setData={setData}/>
                <Filter filterData={filterData} setFilterData={setFilterData}/>
            </div>
            {data && <BooksTable books={data}/>}
             
        
        </motion.div>
    );
};

export default BooksCatalog;
