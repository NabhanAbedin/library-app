import {Link} from 'react-router-dom';
import '../styles/nav.css';

const Nav = () => {
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