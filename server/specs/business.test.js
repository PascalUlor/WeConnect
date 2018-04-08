/**
 * Test for API endpoints
 */
import inputs from './testData/business.data';
import data from './testData/user.data';
import userToken, { request, expect, wrongToken } from './user.test';

const user2Token = { token: null };

const invalidID = 50;


describe('All test cases for Businesses', () => {
  it('Should return `200` for authenticated user details', (done) => {
    request.post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(data.userTwoLogin)
      .end((err, res) => {
        console.log(res.body.token);
        user2Token.token = res.body.token;
        expect(res.body).to.haveOwnProperty('token');
        expect(res).to.have.status(200);
        done();
     });
});
    // test case for POSTing (regBusiness) a business
    describe('All test cases for POSTing a new business', () => {
      describe('Negative test cases for adding a business', () => {
        it('should return `400` status code with error message for undefined requests', (done) => {
          request.post('/api/v1/businesses')
              .set('x-access-token', userToken.token)
              .send({}) // request body not defined
              .expect(422)
              .end((err, res) => {
                expect(res.body).deep.equal({
                  success: false,
                  message: 'Some or all fileds are undefined'
                });
                done();
              });
         });

         it('should return `400` status code with errors message for empty request', (done) => {
            request.post('/api/v1/businesses')
                .set('x-access-token', userToken.token)
                .send(inputs.emptyData) // empty body request
                .expect(400)
                .end((err, res) => {
                    expect(res.body.businessName).to.eql('Business name is required');
                    expect(res.body.aboutUs).to.eql('The About us field is required');
                    expect(res.body.email).to.eql('valid email is required');
                    expect(res.body.category).to.eql('category is required');
                    expect(res.body.location).to.eql('location is required');
                    expect(res.body.address).to.eql('Address is required');
                    expect(res.status).to.equal(400);
                    done();
                });
           });

         it('should return `400` if business name and about us characters are incomplete', (done) => {
          request.post('/api/v1/businesses')
              .set('x-access-token', userToken.token)
              .send(inputs.incompleteData)
              .expect(400)
              .end((err, res) => {
                  expect(res.body).to.have.property('businessName').eql('Business name must be between 3 to 50 characters');
                  expect(res.body).to.have.property('aboutUs').eql('About us field must be between 20 to 1000 characters');
                  expect(res.body).to.have.property('email').eql('valid email is required');
                  done();
              });
         });

         it('should return `400` if business name contain numbers', (done) => {
          request.post('/api/v1/businesses')
              .set('x-access-token', userToken.token)
              .send(inputs.invalidData)
              .expect(400)
              .end((err, res) => {
                  expect(res.body).to.have.property('businessName').eql('Business name must be alphabetical');
                  expect(res.body).to.have.property('aboutUs').eql('About us field must be between 20 to 1000 characters');
                  expect(res.body).to.have.property('email').eql('valid email is required');
                  done();
              });
         });

         it('should return `401` status code for unauthenticated user', (done) => {
          request.post('/api/v1/businesses')
              .set('x-access-token', wrongToken)
              .send({}) // request body not defined
              .expect(401)
              .end((err, res) => {
                expect(res.body).deep.equal({
                  message: 'Authentication failed. Token is invalid or expired'
                });
                done();
              });
         });
      });

      describe('Positive test case for adding a business', () => {
        it('should return `201` status code when user creates business successfully', (done) => {
            request.post('/api/v1/businesses')
                .set('x-access-token', userToken.token)
                .send(inputs.validData1)
                .expect(201)
                .end((err, res) => {
                    expect(res.body.success).to.equal(true);
                    expect(res.body.message).to.equal('Business created successfully');
                    done();
                });
           });
        it('should return `201` status code when another user creates business successfully', (done) => {
            request.post('/api/v1/businesses')
                .set('x-access-token', user2Token.token)
                .send(inputs.validData2)
                .expect(201)
                .end((err, res) => {
                    expect(res.body.success).to.equal(true);
                    expect(res.body.message).to.equal('Business created successfully');
                    done();
                });
           });
          });
    });// End of Add Business test

    describe('All test cases for updating a business profile', () => {
      describe('All negative test cases for updating a business', () => {
          it('should return `404` status code with error messages for invalid business id', (done) => {
              request.put(`/api/v1/businesses/${invalidID}`)
                  .set('x-access-token', userToken.token)
                  .send(inputs.validUpdate1)
                  .expect(404)
                  .end((err, res) => {
                      expect(res.body).deep.equal({
                          message: 'Business with id does not exist'
                      });
                      done();
                  });
              });

          it('should return `422` status code with error messages for undefined inputs', (done) => {
              request.put('/api/v1/businesses/1')
                  .set('x-access-token', userToken.token)
                  .send(inputs.emptyData)
                  .expect(422)
                  .end((err, res) => {
                    expect(res.body).deep.equal({
                      success: false,
                      message: 'Enter a valid update'
                    });
                    expect(res.status).to.equal(422);
                    done();
                  });
              });
          it('should return `400` if data is invalid', (done) => {
                request.put('/api/v1/businesses/1')
                    .set('x-access-token', userToken.token)
                    .send(inputs.invalidData)
                    .expect(400)
                    .end((err, res) => {
                        expect(res.body).to.have.property('businessName').eql('Business name must be alphabetical');
                        expect(res.body).to.have.property('aboutUs').eql('About us field must be between 20 to 1000 characters');
                        expect(res.body).to.have.property('email').eql('valid email is required');
                        done();
                    });
               });
          it('should return `401` status code for unauthenticated user update', (done) => {
                request.put('/api/v1/businesses/1')
                    .set('x-access-token', wrongToken)
                    .send(inputs.validUpdate1) // request body not defined
                    .expect(401)
                    .end((err, res) => {
                      expect(res.body).deep.equal({
                        message: 'Authentication failed. Token is invalid or expired'
                      });
                      done();
                    });
            });
            it('should return `401` status code and not allow user update business he did not create', (done) => {
              request.put('/api/v1/businesses/1')
                  .set('x-access-token', user2Token.token)
                  .send(inputs.validUpdate1) // request body not defined
                  .expect(401)
                  .end((err, res) => {
                    expect(res.body).deep.equal({
                      message: 'Access Denied. You are not authorized to update this business'
                    });
                    done();
                  });
          });
          });

      describe('Positive test case for updating a businesses', () => {
          it('should return `200` status code with success messages successfull update', (done) => {
              request.put('/api/v1/businesses/1')
                  .set('x-access-token', userToken.token)
                  .send(inputs.validUpdate1)
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
      it('should return `404` status code with error message if businessId dont exist', (done) => {
          request.delete(`/api/v1/businesses/${invalidID}`)
            .set('x-access-token', userToken.token)
            .send({})
            .expect(404)
            .end((err, res) => {
              expect(res.body.success).to.equal(false);
              expect(res.body.message).to.equal(`Business with id ${invalidID} does not exist`);
              done();
            });
        });
        it('should return `401` status code for unauthenticated user', (done) => {
          request.delete('/api/v1/businesses/1')
              .set('x-access-token', user2Token.token)
              .send() // request body not defined
              .expect(401)
              .end((err, res) => {
                expect(res.body).deep.equal({
                  success: false,
                  message: 'You are not authorised to delete this business'
                });
                done();
              });
         });
    });

    describe('Positive delete test cases', () => {
      it('should return `200` status code with success message', (done) => {
          request.delete('/api/v1/businesses/1')
            .set('x-access-token', userToken.token)
            .send({})
            .expect(200)
            .end((err, res) => {
              expect(res.body.success).to.equal(true);
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
              .send()
              .expect(200)
              .end((err, res) => {
                expect(res.body.success).to.equal(true);
                expect(res.body.message).to.equal('Successfully Retrieved All Businesses');
                expect(res.body.business);
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
        request.get('/api/v1/businesses?location=Lagos')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
    describe('Test for search by category', () => {
      it('Should return 200 for searches by category', (done) => {
        request.get('/api/v1/businesses?category=Finance')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
              expect(res.status).to.equal(200);
              done();
          });
      });
    });
  });
  });// End of test cases without empty database

  export default user2Token;
