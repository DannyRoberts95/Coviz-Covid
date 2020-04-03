import React from "react";
import { BrowserRouter as Link } from "react-router-dom";

const Navbar = () => {
  const content = (

    
      <nav className="uk-navbar-container" uk-navbar="true">
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li className="uk-active">
              <Link to="/">Home</Link>
            </li>
            
          </ul>
        </div>
      </nav>
  );
  return content;
};

export default Navbar;
