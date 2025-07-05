import {Link} from 'react-router-dom';
import '../styles/nav.css';
import { useState, useEffect } from 'react';
import { checkLoggedIn, logOut } from '../api/apiFunctions';


const Nav = () => {
  //later have a function that checks if the user is signed in to display the correct text
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=> {
    const fetchData = async () => {
      try {
        const res = await checkLoggedIn();
        if (res.status === 200) {
          setLoggedIn(true);
          console.log('logged in true');
        } else {
          console.log('error');
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  },[]);

  const handleLogInNav = () => {
    if (loggedIn) {
      return (
        <button className='nav-button' onClick={async () => {
          try {
            await logOut();
            setLoggedIn(false)
          } catch (err) {
            console.log(err);
          }
        }}>
            Log out
        </button>
       
      )
    }
    return (
      <Link to='/Login' className='nav-link'>
      Log in
      </Link>
    )
  }


  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-content">
          <div className="nav-links">
            <Link to='/' className="nav-link">
              Library
            </Link>
            <Link to='/addContent' className="nav-link">
              add content
            </Link>
            <Link to='/Catalog' className="nav-link">
              Catalog
            </Link>
            <Link to='/myCollection' className="nav-link">
              My collection
            </Link>
            {handleLogInNav()}
          </div>
          
          <button className="nav-mobile-btn">
            <svg className="nav-hamburger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;