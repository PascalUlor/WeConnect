/**
 * Test for dummy data API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { businessData, reviewsData } from '../dataModel/testData';

chai.use(chaiHttp);
const { expect } = chai,
    request = supertest(app),
    invalidID = 50;

describe('All test cases for application', () => {
    describe('Test case for loading application home page', () => {
        it('should load application home page', (done) => {
            request.get('/')
                .set('Content-Type', 'application/json')
                .expect(200)
                .end((err, res) => {
                    expect(res.body).deep.equal({
                        name: 'Don Ulor',
                        message: 'Welcome to WeConnect'
                    });
                    if (err) done(err);
                    done();
                });
        });
    });
     // test invalid routes
    describe('Test Case For Invalid Routes', () => {
        it('Should return a message when an invalid route is accessed', (done) => {
            request
                .get('/api/v1/some-rubbish')
                .set('Connection', 'keep alive')
                .set('Content-Type', 'application/json')
                .expect(404)
                .end((err, res) => {
                    expect(res.body).deep.equal({
                        message: 'Invalid routes'
                    });
                    if (err) done(err);
                    done();
                });
        });

        it('should fail to get route', (done) => {
            request.get('/api/v1')
                .set('Contet-Type', 'application/json')
                .expect(404)
                .end((err, res) => {
                    expect(res.body).deep.equal({
                        message: 'Invalid routes'
                    });
                    if (err) done(err);
                    done();
                });
        });

        it('should return `404` page for all invalid routes', (done) => {
            request.get('/weconnect/recipes')
                .set('Content-Type', 'application/json')
                .expect(404)
                .end((err, res) => {
                    expect(res.body).deep.equal({
                        message: 'Invalid routes'
                    });
                    if (err) done(err);
                    done();
                });
        });
    });
    // test case for POSTing (regBusiness) a business
    describe('All test cases for POSTing a new business', () => {
      describe('Negative test cases for adding a business', () => {
        it('should return `400` status code with error message for undefined requests', (done) => {
          request.post('/api/v1/businesses')
              .set('Content-Type', 'application/json')
              .send({}) // request body not defined
              .expect(400)
              .end((err, res) => {
                expect(res.body).deep.equal({
                  status: 'Failed',
                  message: 'Some or all fields are undefined'
                });
                if (err) done(err);
                done();
              });
         });

         it('should return `400` status code with errors message for empty request', (done) => {
            request.post('/api/v1/businesses')
                .set('Content-Type', 'application/json')
                .send({
                  businessName: '',
                  email: '',
                  category: '',
                  location: '',
                  Details: ''
                }) // empty body request
                .expect(400)
                .end((err, res) => {
                    expect(res.body.businessName).to.eql('Business name is required');
                    expect(res.body.Details).to.eql('Business Details is required');
                    expect(res.body.email).to.eql('email is required');
                    expect(res.body.category).to.eql('category is required');
                    expect(res.body.location).to.eql('location is required');
                    expect(res.status).to.equal(400);
                    if (err) done(err);
                    done();
                });
           });

         it('should return `400` status code with error messages for validation error', (done) => {
          request.post('/api/v1/businesses')
              .set('Content-Type', 'application/json')
              .send({
                businessName: 'a',
                email: 'fgxdfhgv',
                category: 'fhfcvgfv',
                location: 'hgfcjgvh',
                Details: 'abcd'
              })
              .expect(400)
              .end((err, res) => {
                  expect(res.body).to.have.property('businessName').eql('Business name must be between 3 to 50 characters');
                  expect(res.body).to.have.property('Details').eql('Business Details must be between 20 to 1000 characters');
                  done();
              });
         });
      });

      describe('Positive test case for adding a business', () => {
        it('should return `201` status code with success messages for successfull post', (done) => {
            request.post('/api/v1/businesses')
                .set('Content-Type', 'application/json')
                .send({
                    businessName: 'SlimTrader',
                    email: 'slimtrader@gmail.com',
                    category: 'IT',
                    location: 'Lagos',
                    Address: '123 V.I Lagos',
                    Details: 'Business Details must be between 20 to 1000 characters'
                })
                .expect(201)
                .end((err, res) => {
                    expect(res.body.status).to.equal('Success');
                    expect(res.body.message).to.equal('Business created successfully');
                    done();
                });
           });
          });
    });// End of Add Business test

    describe('All test cases for updating a business profile', () => {
      describe('All negative test cases for updating a business', () => {
          it('should return `400` status code with error messages for invalid id', (done) => {
              request.put(`/api/v1/businesses/${invalidID}`)
                  .set('Content-Type', 'application/json')
                  .send({
                    businessName: 'SlimTrader',
                    email: 'slimtrader@gmail.com',
                    category: 'IT',
                    Address: '123 V.I Lagos',
                    location: 'Lagos',
                    Details: 'Island'
                  })
                  .expect(400)
                  .end((err, res) => {
                      expect(res.body).deep.equal({
                          status: 'Failed',
                          message: 'Business with id does not exist'
                      });
                      if (err) done(err);
                      done();
                  });
              });

          it('should return `400` status code with error messages for undefined', (done) => {
              request.put('/api/v1/businesses/1')
                  .set('Content-Type', 'application/json')
                  .send({
                    businessName: '',
                    email: '',
                    category: '',
                    Address: '',
                    location: '',
                    Details: ''
                  })
                  .expect(400)
                  .end((err, res) => {
                      expect(res.body).deep.equal({
                          status: 'Failed',
                          message: 'Data to update not specified'
                      });
                      if (err) done(err);
                      done();
                  });
              });
      });

      describe('Positive test case for updating a businesses', () => {
          it('should return `200` status code with success messages successfull update', (done) => {
              request.put('/api/v1/businesses/2')
                  .set('Content-Type', 'application/json')
                  .send({
                    id: 1,
                    businessName: 'SlimTrader',
                    email: 'slimtrader@gmail.com',
                    category: 'IT',
                    Address: '123 V.I Lagos',
                    location: 'Lagos',
                    Details: 'Business Details must be between 20 to 1000 characters'
                  })
                  .expect(200)
                  .end((err, res) => {
                      expect(res.body.status).to.equal('Successfull');
                      expect(res.body.message).to.equal('Business with id successfully update');
                      if (err) done(err);
                      done();
                  });
          });
      });
  });// Update Test end

  describe('Test cases for deleting business', () => {
    describe('All negative delete test cases', () => {
      it('should return `400` status code with error message for failed invalid Id', (done) => {
          request.delete(`/api/v1/businesses/${invalidID}`)
            .set('Content-Type', 'application/json')
            .send({})
            .expect(400)
            .end((err, res) => {
              expect(res.body.status).to.equal('Failed');
              expect(res.body.message).to.equal('Business with id does not exist');
              if (err) done(err);
              done();
            });
        });
    });

    describe('Positive delete test cases', () => {
      it('should return `200` status code with success message', (done) => {
          request.delete('/api/v1/businesses/1')
            .set('Content-Type', 'application/json')
            .send({})
            .expect(200)
            .end((err, res) => {
              expect(res.body.status).to.equal('Successfull');
              expect(res.body.message).to.equal('Business successfully deleted');
              if (err) done(err);
              done();
            });
        });
    });
  });

  describe('Test cases for Getting All business', () => {
        describe('Positive test cases for Get All Business', () => {
      it('should return `200` status code with `res.body` success message', (done) => {
          request.get('/api/v1/businesses')
            .set('Content-Type', 'application/json')
            .send({})
            .expect(200)
            .end((err, res) => {
              expect(res.body.status).to.equal('Successfull');
              expect(res.body.message).to.equal('Successfully Retrieved all businesses');
              expect(businessData);
              if (err) done(err);
              done();
            });
        });
    });
  });

  describe('Test cases for posting business reviews', () => {
    describe('Negative test case for posting reviews', () => {
      it('should return `400` status code with `res.body` error message', (done) => {
          request.post(`/api/v1/businesses/${invalidID}/reviews`)
            .set('Content-Type', 'application/json')
            .send({
            id: 1,
              reviewDetail: 'Quality',
              userId: 3,
              businessId: 1
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.status).to.equal('Failed');
              expect(res.body.message).to.equal('No reviews available');
              if (err) done(err);
              done();
            });
        });
    });

    describe('Positive test case for posting reviews', () => {
      it('should return `201` status code with `res.body` success message', (done) => {
          request.post('/api/v1/businesses/1/reviews')
            .set('Content-Type', 'application/json')
            .send({
              id: 1,
              reviewDetail: 'Quality',
              userId: 3,
              businessId: 1
            })
            .expect(201)
            .end((err, res) => {
              expect(res.body.status).to.equal('Successfull');
              expect(res.body.message).to.equal('Successfull');
              expect(reviewsData);
              done();
            });
        });
    });
  });

  describe('Test case for retrieving a Single business', () => {
    describe('Negative test case for retriving a single business', () => {
      it('Should return `400` status code with for invalid id', (done) => {
        request.get(`/api/v1/businesses/${invalidID}`)
          .set('Content-Type', 'application/json')
          .send({})
          .expect(400)
          .end((err, res) => {
              expect(res.body.status).to.equal('Failed');
              expect(res.body.message).to.equal('Business does not exist');
              done();
          });
      });
    });

    describe('Positive test case for retriving a single business', () => {
      it('Should return `200` status code with `res body` success message', (done) => {
        request.get('/api/v1/businesses/2')
          .set('Content-Type', 'application/json')
          .send({})
          .expect(200)
          .end((err, res) => {
              expect(res.body.status).to.equal('Successfull');
              expect(res.body.message).to.equal('Successfully Retrieved Business');
              done();
          });
      });
    });
  });

  describe('Test cases for Retrieving reviews', () => {
    describe('Positive case for GET Reviews', () => {
      it('Should return 200 for getting reviews', (done) => {
        request.get('/api/v1/businesses/1/reviews')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
      });
     });
    });
    describe('Negative case for GET Reviews', () => {
      it('Should return 404 for reviews that does not exist', (done) => {
        request.get(`/api/v1/businesses/${invalidID}/review`)
          .set('Content-Type', 'application/json')
          .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('Test case for searching by Location or category', () => {
    describe('Test for search by Location', () => {
      it('Should return 200 for searches by location', (done) => {
        request.get('/api/v1/businesses?location=lagos')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
    describe('Test for search by category', () => {
      it('Should return 200 for searches by category', (done) => {
        request.get('/api/v1/businesses?category=IT')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
              expect(res.status).to.equal(200);
              done();
          });
      });
    });
  });

  describe('All Test cases for user Signup', () => {
    describe('Negative Test case for user signup', () => {
      it('Should return `400` if some fields are not filled', (done) => {
        request.post('/api/v1/auth/signup')
          .set('Content-Type', 'application/json')
          .send({
            fullname: 'Dara',
            email: '',
            userName: '',
            password: 'password'
            })
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
         });
      });
      it('Should return `400` if username already exists', (done) => {
        request.post('/api/v1/auth/signup')
          .set('Content-Type', 'application/json')
          .send({
            fullname: 'Mike',
            email: 'mk@yahoo.com',
            userName: 'Pascal',
            password: '123'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.status).to.equal('failed');
              expect(res.body.message).to.equal('Username already exist');
                done();
            });
      });
    });
    describe('Positive Test case for user signup', () => {
      it('Should return `200` for unique username signups', (done) => {
        request.post('/api/v1/auth/signup')
          .set('Content-Type', 'application/json')
          .send({
            fullname: 'Barry Allen',
            email: 'barry@yahoo.com',
            userName: 'The Flash',
            password: 'Allen'
          })
          .expect(200)
              .end((err, res) => {
                expect(res.body.status).to.equal('successfull');
                expect(res.body.message).to.equal('Signup successfull. You may proceed');
                  done();
              });
        });
    });
  });

  describe('All Test cases for user login', () => {
    describe('Negative Test case for user login', () => {
      it('Should return `400` for wrong user input', (done) => {
        request.post('/api/v1/auth/login')
          .set('Content-Type', 'application/json')
          .send({
            userName: 'Wally',
            password: 'west'
            })
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
         });
      });
    });
    describe('Positive Test case for user login', () => {
      it('Should return `200` for authenticated user details', (done) => {
        request.post('/api/v1/auth/login')
          .set('Content-Type', 'application/json')
          .send({
            userName: 'Emeka',
            password: '453'
            })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
         });
      });
    });
  });
});// End of All test cases