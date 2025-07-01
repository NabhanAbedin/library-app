import filterImg from '../../images/filter.png';
import squaresImg from '../../images/squares.png';
import { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import SortByYear from './SortByYear.jsx';
import { filterByBook } from '../../api/apiFunctions.js';


const SortBy = ({filterData, setFilterData }) => {
  return (
    <form>
      {['books', 'author', 'genre'].map(option => (
        <label key={option}>
          <input
            type="radio"
            name="category"
            value={option}
            checked={filterData.sortBy === option}
            onChange={(e) =>
              setFilterData(prev => ({
                ...prev,
                sortBy: e.target.value
              }))
            }
          />
          {option}
        </label>
      ))}
    </form>
  );
};



const Filter = ({setData}) => {
    const [active, setActive] = useState(false);
    const [filterData, setFilterData] = useState({
        sortBy: 'books',
        orderBy: 'descending',
        from: null,
        to: null
    });
    const [inputFrom , setInputFrom] = useState('');
    const [inputTo , setInputTo] = useState('');
    //add params here to check which components to add

    useEffect(()=> {
        //have to fix this because this is being called on the initial render 
        //have the render be done here
        const fetchData = async () => {
            try {
                const result = await filterByBook(filterData);
                console.log(result)
                setData(result);
            } catch (err) {
                console.log(err);
            };
        };
        fetchData();
    },[filterData])

    return (
        <>
        <button className="filter-button" onClick={()=> setActive(!active)}><img src={squaresImg} alt="" /></button>
        <AnimatePresence>
        {active && (
            <motion.div
              className="filter-inputs-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit ={{opacity: 0}}
              transition={{ duration: 0.15, ease: 'easeInOut' }}
            >
                    <div className='filter-section'>
                        <p>sort by</p>
                        <SortBy filterData={filterData} setFilterData={setFilterData} />
                    </div>
                    <div className='filter-section'>
                        <p>order by</p>
                        <select 
                        id='order-select'
                        value={filterData.orderBy}
                        onChange={(e) =>
                            setFilterData(prev => ({
                              ...prev,
                              orderBy: e.target.value
                            }))
                          }
                        >
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                        </select>
                    </div>
                    <div className='filter-section'>
                        <SortByYear inputFrom={inputFrom} setInputFrom={setInputFrom}
                        inputTo={inputTo} setInputTo={setInputTo}
                        setFilterData={setFilterData}/>
                        
                    </div>
            </motion.div>
        )}
        </AnimatePresence>
        </>
    );
};

export default Filter;