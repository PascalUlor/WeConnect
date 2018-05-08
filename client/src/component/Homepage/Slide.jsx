import React from 'react';
import { Router, Route, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';


const browserHistory = createBrowserHistory();

export default class Slide extends React.Component {
  render() {
    return(
      <Router history={browserHistory}>
        {/* <!-- Carousel begin--> */}
        <div className="container col-md-12">
          <section id="carousel" className="section-content">

            <section className="cover text-center mb-3 linehead">
              <h3 className="text-info hp-title">Our Businesses</h3>
              {/* <!-- <hr id="line"> --> */}
              <small>
                <Link to="catalog.html">view full catalog here</Link>
              </small>
            </section>
            <div id="carousel-home" className="carousel slide" data-ride="carousel">
              <ol className="carousel-indicators">
                <li data-target="#carousel-home" data-slide-to="0" className="active"></li>
                <li data-target="#carousel-home" data-slide-to="1"></li>
                <li data-target="#carousel-home" data-slide-to="2"></li>
              </ol>
              <div className="carousel-inner" role="listbox">
                {/* <!-- Carousel item1--> */}
                <div className="carousel-item active">
                  <div className="container col-sm-7 col-md-10 col-lg-10">
                    <div className="card-deck mb-5">
                      <div className="card img-zoom catcard">
                        <div className="card-block">
                          <h4 className="card-title">IT Services</h4>
                          <h6 className="card-text">some text here</h6>
                        </div>
                        <img className="card-img-top img-fluid" src="./public/images/tech.jpg" alt="me at work" />
                        <div className="card-block">
                          <h4 className="card-title">Card title that wraps to a new line</h4>
                          <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                        is a little bit longer.</p>
                        </div>
                        <div className="card-text text-center">
                          <Link to="./business-profile.html" role="button" className="btn btn-outline-info btn-lg mb-2">
                            <small>
                              <i className="fa fa-eye"></i> View</small>
                          </Link>
                        </div>
                      </div>
                      <div className="card img-zoom catcard">
                        <div className="card-block">
                          <h4 className="card-title">Finance Service</h4>
                          <h6 className="card-text">some text here</h6>
                        </div>
                        <img className="card-img-top img-fluid" src="./public/images/finan.jpg" alt="me at work" />
                        <div className="card-block">
                          <h4 className="card-title">Card title that wraps to a new line</h4>
                          <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                        is a little bit longer.</p>
                        </div>
                        <div className="card-text text-center">
                          <Link to="./business-profile.html" role="button" className="btn btn-outline-info btn-lg mb-2">
                            <small>
                              <i className="fa fa-eye"></i> View</small>
                          </Link>
                        </div>
                      </div>
                      <div className="card img-zoom catcard">
                        <div className="card-block">
                          <h4 className="card-title">Hospitality</h4>
                          <h6 className="card-text">some text here</h6>
                        </div>
                        <img className="card-img-top img-fluid" src="./public/images/hosp.jpg" alt="me at work" />
                        <div className="card-block">
                          <h4 className="card-title">Card title that wraps to a new line</h4>
                          <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                        is a little bit longer.</p>
                        </div>
                        <div className="card-text text-center">
                          <a to="./business-profile.html" role="button" className="btn btn-outline-info btn-lg mb-2">
                            <small>
                              <i className="fa fa-eye"></i> View</small>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Carousel item2--> */}
                <div className="carousel-item">
                  <div className="container col-sm-7 col-md-10 col-lg-10">
                    <div className="card-deck mb-5">
                      <div className="card img-zoom catcard">
                        <div className="card-block">
                          <h4 className="card-title">Engineering</h4>
                          <h6 className="card-text">some text here</h6>
                        </div>
                        <img className="card-img-top img-fluid" src="./public/images/engineering.jpg" alt="me at work" />
                        <div className="card-block">
                          <h4 className="card-title">Card title that wraps to a new line</h4>
                          <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                        is a little bit longer.</p>
                        </div>
                        <div className="card-text text-center">
                          <Link to="./business-profile.html" role="button" className="btn btn-outline-info btn-lg mb-2">
                            <small>
                              <i className="fa fa-eye"></i> View</small>
                          </Link>
                        </div>
                      </div>
                      <div className="card img-zoom catcard">
                        <div className="card-block">
                          <h4 className="card-title">Health Care</h4>
                          <h6 className="card-text">some text here</h6>
                        </div>
                        <img className="card-img-top img-fluid" src="./public/images/health.jpg" alt="me at work" />
                        <div className="card-block">
                          <h4 className="card-title">Card title that wraps to a new line</h4>
                          <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                        is a little bit longer.</p>
                        </div>
                        <div className="card-text text-center">
                          <Link to="./business-profile.html" role="button" className="btn btn-outline-info btn-lg mb-2">
                            <small>
                              <i className="fa fa-eye"></i> View</small>
                          </Link>
                        </div>
                      </div>
                      <div className="card img-zoom catcard">
                        <div className="card-block">
                          <h4 className="card-title">Education</h4>
                          <h6 className="card-text">some text here</h6>
                        </div>
                        <img className="card-img-top img-fluid" src="./public/images/education.jpg" alt="me at work" />
                        <div className="card-block">
                          <h4 className="card-title">Card title that wraps to a new line</h4>
                          <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                        is a little bit longer.</p>
                        </div>
                        <div className="card-text text-center">
                          <Link to="./business-profile.html" role="button" className="btn btn-outline-info btn-lg mb-2">
                            <small>
                              <i className="fa fa-eye"></i> View</small>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- Carousel item3--> */}
                <div className="carousel-item">
                  <div className="container col-sm-7 col-md-10 col-lg-10">
                    <div className="card-deck mb-5">
                      <div className="card img-zoom catcard">
                        <div className="card-block">
                          <h4 className="card-title">Agriculture</h4>
                          <h6 className="card-text">some text here</h6>
                        </div>
                        <img className="card-img-top img-fluid" src="./public/images/agric.jpg" alt="me at work" />
                        <div className="card-block">
                          <h4 className="card-title">Card title that wraps to a new line</h4>
                          <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                        is a little bit longer.</p>
                        </div>
                        <div className="card-text text-center">
                          <Link to="./business-profile.html" role="button" className="btn btn-outline-info btn-lg mb-2">
                            <small>
                              <i className="fa fa-eye"></i> View</small>
                          </Link>
                        </div>
                      </div>
                      <div className="card img-zoom catcard">
                        <div className="card-block">
                          <h4 className="card-title">Contruction</h4>
                          <h6 className="card-text">some text here</h6>
                        </div>
                        <img className="card-img-top img-fluid" src="./public/images/construction.jpg" alt="me at work" />
                        <div className="card-block">
                          <h4 className="card-title">Card title that wraps to a new line</h4>
                          <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                        is a little bit longer.</p>
                        </div>
                        <div className="card-text text-center">
                          <Link to="./business-profile.html" role="button" className="btn btn-outline-info btn-lg mb-2">
                            <small>
                              <i className="fa fa-eye"></i> View</small>
                          </Link>
                        </div>
                      </div>
                      <div className="card img-zoom catcard">
                        <div className="card-block">
                          <h4 className="card-title">Aviation</h4>
                          <h6 className="card-text">some text here</h6>
                        </div>
                        <img className="card-img-top img-fluid" src="./public/images/aviation.jpg" alt="me at work" />
                        <div className="card-block">
                          <h4 className="card-title">Card title that wraps to a new line</h4>
                          <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content
                        is a little bit longer.</p>
                        </div>
                        <div className="card-text text-center">
                          <Link to="./business-profile.html" role="button" className="btn btn-outline-info btn-lg mb-2">
                            <small>
                              <i className="fa fa-eye"></i> View</small>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--carousel item3end--> */}
              </div>
              <Link className="carousel-control-prev" to="#carousel-home" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </Link>
              <Link className="carousel-control-next" to="#carousel-home" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </Link>
            </div>
          </section>
        </div>
        {/* <!--Carousel end--> */}
      </Router>
    )
  }
}