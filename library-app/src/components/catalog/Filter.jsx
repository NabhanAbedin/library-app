import filterImg from '../../images/filter.png';
import squaresImg from '../../images/squares.png';
import { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion';
import SortByYear from './SortByYear.jsx';



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



const Filter = ({filterData, setFilterData}) => {
    const [active, setActive] = useState(false);
    const [inputFrom , setInputFrom] = useState('');
    const [inputTo , setInputTo] = useState('');
    //add params here to check which components to add

    

    return (
        <div className="filter-wrapper">
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
        </div>
    );
};

export default Filter;