# WeConnect
This is an online business management application. An Andela Bootcamp Project.


##API END POINTS AND FUNCTIONALITY

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






