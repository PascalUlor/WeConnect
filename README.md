# WeConnect
This is an online business management application. An Andela Bootcamp Project.


## API END POINTS AND FUNCTIONALITY

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


my git branches
dummy-feature-updateBusniess-155614662 -- updateBusiness

dummy-feature-getReviews-155614997 -- getReviews

dummy-feature-regBusiness-155614618 -- POST

dummy-bugfix-getSingleBusiness-155615105 -- getSingleBusiness

dummy-bugfix-deleteBusiness-155614733 -- Delete Route

dummy-location-155615169-category-155615218 -- Location/category

validation -- Validation

user-access-155817277

tests "nodemon --watch server --exec babel-node -- server/app.js"

heroku-155883985

apidocumentation-155925612

Creating pc-connect... done
https://pc-connect.herokuapp.com/ | https://git.heroku.com/pc-connect.git