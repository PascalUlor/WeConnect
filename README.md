# WeConnect

[![Build Status](https://travis-ci.org/PascalUlor/WeConnect.svg?branch=tests)](https://travis-ci.org/PascalUlor/WeConnect)  [![Coverage Status](https://coveralls.io/repos/github/PascalUlor/WeConnect/badge.svg?branch=heroku-155883985)](https://coveralls.io/github/PascalUlor/WeConnect?branch=heroku-155883985) 

[![Maintainability](https://api.codeclimate.com/v1/badges/23742785ee620103b731/maintainability)](https://codeclimate.com/github/PascalUlor/WeConnect/maintainability)

**WeConnect**
This is an online business management application. An Andela Bootcamp Project.

This application is for online business registration and search. It is to help business owners get their business out to the world thus reaching potential customers with ease

Applications API end points have being created and tested for errors with dummy data.
All routes are working as specified in project.# WeConnect

[![Build Status](https://travis-ci.org/PascalUlor/WeConnect.svg?branch=tests)](https://travis-ci.org/PascalUlor/WeConnect)  [![Coverage Status](https://coveralls.io/repos/github/PascalUlor/WeConnect/badge.svg?branch=heroku-155883985)](https://coveralls.io/github/PascalUlor/WeConnect?branch=heroku-155883985) 

[![Maintainability](https://api.codeclimate.com/v1/badges/23742785ee620103b731/maintainability)](https://codeclimate.com/github/PascalUlor/WeConnect/maintainability)

**WeConnect**
This is an online business management application. **WeConnect** application is for online business registration and search. It is to help business owners get their business out to the world thus reaching potential customers with ease

Applications API end points have being created and tested for errors with dummy data.
All routes are working as specified in project.

## Getting Started
The application can be accessed through heroku at https://pc-connect.herokuapp.com or can be cloned from github.com.

### User Interface
The user interface is built for easy navigation and use of the application. It includes the following:

1.	User signup and signin pages.
2.	A page where an authenticated user can register his/her business.
3.	A page that shows profile of a business and shows the available reviews from users about  that business.
4.	A page that allows a user to update his/her business profile.
5.	A business listing or catalog page that allows viewers to search for businesses. 



## API END POINTS AND FUNCTIONALITY
### Tested with In Memory Data

| EndPoint | Functionality |
| --- | --- |
| POST `/auth/signup` | Register a *user* |
|POST `/auth/login` |	Login a **user**|
|POST `/businesses/` |	Register a **business** |
|PUT `/businesses/`<businessId> |	Update **business profile** |
|DELETE `/businesses/`<businessId> |	Remove a **business** |
|GET  `/businesses/businessId` |	Get a **business** |
|GET `/businesses`	| Get all **businesses** |
|POST  `/businesses/<businessid>/reviews` |	Add a review for a **business**|
|GET   `/businesses/<businessid>/reviews` |	Get all reviews for a **business**|
|GET  `/businesses?location=<location>`|Get all businesses with the *specified location*|
|GET `/businesses?category=<category>` |Get all businesses with the *specified category*|


## Built With
**WeConnect** was built with open source web softwares

