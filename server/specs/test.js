/**
 * Test for dummy data API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai;';
import app from '../app';

const { expect } = chai,
    request = supertest(app);

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
        it('should return `400` status code with res.body error message', (done) => {
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

         it('should return `400` status code with `res.body.errors` messages', (done) => {
          request.post('/api/v1/businesses')
              .set('Content-Type', 'application/json')
              .send({
                  businessName: '',
                  email: '',
                  category: '',
                  location: ''
              }) // empty body request
              .expect(400)
              .end((err, res) => {
                  expect('Business name is required').to.equal(res.body.errors.businessName);
                  expect('email is required').to.equal(res.body.errors.email);
                  expect('category is required').to.equal(res.body.errors.category);
                  expect('location is required').to.equal(res.body.errors.location);
                  if (err) done(err);
                  done();
              });
         });

         it('should return `400` status code with `res.body.error` messages', (done) => {
          request.post('/api/v1/businesses')
              .set('Content-Type', 'application/json')
              .send({
                businessName: 'a',
              })
              .expect(400)
              .end((err, res) => {
                  expect('Business name must be between 3 to 50 characters').to.equal(res.body.errors.businessName);
                  if (err) done(err);
                  done();
              });
         });
      });
    });// End of Add Business test
});// End of All test cases