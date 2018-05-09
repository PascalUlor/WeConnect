import React from 'react';
import { Router, RouteLink } from 'react-router-dom';
import { createBrowserHistory } from 'history';


const browserHistory = createBrowserHistory();

const Footer = () => {
    return (
      <Router history={browserHistory}>
        <footer id="footer-main">
      <div className="container">
        <div className="row">
          <div className="col-sm-3">
            <p>Copywrite Pascal</p>
          </div>
          <div className="col-sm-3">
            <ul className="list-unstyled">
              <li>
                <Link to="">home</Link>
              </li>
              <li>
                <Link to="">about</Link>
              </li>
              <li>
                <Link to="">contact</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-3">
            <ul className="list-unstyled">
              <li>
                <Link to="">facebook</Link>
              </li>
              <li>
                <Link to="">twitter</Link>
              </li>
              <li>
                <Link to="">Instagram</Link>
              </li>
            </ul>
          </div>
          <div className="col-sm-3">
            <h6>WeConnect</h6>
            <p>Taking you to the world</p>
          </div>
        </div>
      </div>
    </footer>
    </Router>
    );
}

export default Footer;