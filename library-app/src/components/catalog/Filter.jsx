import filterImg from '../../images/filter.png';
import squaresImg from '../../images/squares.png';
import { useState, useEffect } from 'react';
import {motion,AnimatePresence} from 'framer-motion';
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
        orderBy: 'descending'
        
    })

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const result = await filterByBook(filterData);
                console.log(result)
                setData(result);
            } catch (err) {
                console.log(err);
            }

        };
        fetchData();
    },[filterData])

    //the idea is that first its going to be a mini drop down to where the user decides which category they want to sort by after the user chooses, its going to animate into a bigger drop down where the user then has choices depending on the choice, being advanced features as normally it will be sorted A-Z all the filtering will be done through sql query functions in order to practice the use of sql the controller will then handle how the table is rendered through conditionals sent with one api function
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
            </motion.div>
        )}
        </AnimatePresence>
        </>
    );
};

export default Filter;