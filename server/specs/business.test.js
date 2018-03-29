/**
 * Test for API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models';

const { User, Business, Reviews } = models;

chai.use(chaiHttp);
const { expect } = chai,
    request = supertest(app),
    invalidID = 50;

describe('All test cases for application without empty database', () => {
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
                    done();
                });
        });

        it('should return `404` page for all invalid routes', (done) => {
            request.get('/weconnect/gibberish')
                .set('Content-Type', 'application/json')
                .expect(404)
                .end((err, res) => {
                    expect(res.body).deep.equal({
                        message: 'Invalid routes'
                    });
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
              .expect(403)
              .end((err, res) => {
                expect(res.body).deep.equal({
                  message: 'Access denied. You are not logged in'
                });
                done();
              });
         });

        //  it('should return `400` status code with errors message for empty request', (done) => {
        //     request.post('/api/v1/businesses')
        //         .set('Content-Type', 'application/json')
        //         .send({
        //             businessName: '',
        //             email: '',
        //             Address: '',
        //             category: '',
        //             location: '',
        //             businessImage: '',
        //             aboutUs: ''
        //         }) // empty body request
        //         .expect(400)
        //         .end((err, res) => {
        //             expect(res.body.businessName).to.eql('Business name is required');
        //             expect(res.body.Details).to.eql('Business Details is required');
        //             expect(res.body.email).to.eql('email is required');
        //             expect(res.body.category).to.eql('category is required');
        //             expect(res.body.location).to.eql('location is required');
        //             expect(res.status).to.equal(400);
        //             done();
        //         });
        //    });

        //  it('should return `400` status code with error messages for validation error', (done) => {
        //   request.post('/api/v1/businesses')
        //       .set('Content-Type', 'application/json')
        //       .send({
        //         businessName,
        //         email,
        //         Address,
        //         category,
        //         location,
        //         businessImage,
        //         aboutUs
        //       })
        //       .expect(400)
        //       .end((err, res) => {
        //           expect(res.body).to.have.property('businessName').eql('Business name must be between 3 to 50 characters');
        //           expect(res.body).to.have.property('Details').eql('Business Details must be between 20 to 1000 characters');
        //           done();
        //       });
        //  });
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
                    businessImage: 'business picture',
                    aboutUs: 'Business Details must be between 20 to 1000 characters'
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
                    businessImage: 'business pix',
                    aboutUs: 'Business Details must be between 20 to 1000 characters'
                  })
                  .expect(400)
                  .end((err, res) => {
                      expect(res.body).deep.equal({
                          status: 'Failed',
                          message: 'Business with id does not exist'
                      });
                      done();
                  });
              });

          it('should return `400` status code with error messages for undefined inputs', (done) => {
              request.put('/api/v1/businesses/1')
                  .set('Content-Type', 'application/json')
                  .send({
                    businessName: '',
                    email: '',
                    category: '',
                    Address: '',
                    location: '',
                    businessImage: '',
                    aboutUs: ''
                  })
                  .expect(400)
                  .end((err, res) => {
                    expect(res.body.businessName).to.eql('Business name is required');
                    expect(res.body.Details).to.eql('Business Details is required');
                    expect(res.body.email).to.eql('email is required');
                    expect(res.body.category).to.eql('category is required');
                    expect(res.body.location).to.eql('location is required');
                    expect(res.status).to.equal(400);
                    done();
                  });
              });
      });

      describe('Positive test case for updating a businesses', () => {
          it('should return `200` status code with success messages successfull update', (done) => {
              request.put('/api/v1/businesses/2')
                  .set('Content-Type', 'application/json')
                  .send({
                    businessName: 'SlimTrader',
                    email: 'slimtrader@gmail.com',
                    category: 'IT',
                    Address: '123 V.I Lagos',
                    location: 'Lagos',
                    businessImage: 'business picture',
                    aboutUs: 'Business Details must be between 20 to 1000 characters'
                  })
                  .expect(200)
                  .end((err, res) => {
                      expect(res.status).to.equal(200);
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
              expect(res.body.success).to.equal('True');
              expect(res.body.message).to.equal('Business successfully deleted');
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
              expect(db.businessData);
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
          .expect(404)
          .end((err, res) => {
              expect(res.status).to.equal(404);
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
              expect(res.status).to.equal(200);
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
  });// End of test cases without empty database
