/**
 * Test for dummy data API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import app from '../app';
import inputs from './testData/user.data';

export const request = supertest(app);
export const { expect } = chai;
export const wrongToken = 'ThisIsAWrongToken';

const userToken = { token: null };

describe('test cases for user sign up and sign in operations', () => {
  describe('All Test cases for user Signup', () => {
    describe('Positive Test case for user signup', () => {
      it('Should return `201` for unique username signups', (done) => {
      request.post('/api/v1/auth/signup')
        .set('Content-Type', 'application/json')
        .send(inputs.validInput1)
        .expect(201)
            .end((err, res) => {
              expect(res.body.success).to.equal(true);
              expect(res.body).to.haveOwnProperty('token');
              expect(res.body.message).to.equal('Signup successfull. You may proceed');
              expect(res.body.user).to.eql({
                id: 1,
                userName: 'hulk',
                email: 'banner@yahoo.com'
              });
              if (err) done(err);
              done();
            });
        });
      it('Should return `201` when another unique username signups', (done) => {
        request.post('/api/v1/auth/signup')
          .set('Content-Type', 'application/json')
          .send(inputs.validInput2)
          .expect(201)
              .end((err, res) => {
                expect(res.body).to.have.property('success').equal(true);
                expect(res.body).to.haveOwnProperty('token');
                expect(res.body.message).to.equal('Signup successfull. You may proceed');
                expect(res.body.user).to.eql({
                  id: 2,
                  userName: 'Pascal',
                  email: 'mk@yahoo.com'
                });
                if (err) done(err);
                done();
              });
        });
  });

    describe('Negative Test case for user signup', () => {
      it('Should return `422` if some fields are undefined or not filled', (done) => {
        request.post('/api/v1/auth/signup')
          .set('Content-Type', 'application/json')
          .send(inputs.incompleteData)
          .end((err, res) => {
            expect(res).to.have.status(422);
            expect(res.body.success).to.equal(false);
            expect(res.body.errors).to.eql('Some or all fields are undefined');
            if (err) done(err);
            done();
         });
      });
      it('Should return `409` if username already exists and not create account', (done) => {
        request.post('/api/v1/auth/signup')
          .set('Content-Type', 'application/json')
          .send(inputs.existingUsername)
            .expect(409)
            .end((err, res) => {
              expect(res.status).to.eql(409);
              expect(res.body.success).to.eql(false);
              expect(res.body.errors).to.have.property('userName').eql('Username already exist');
                if (err) done(err);
                done();
            });
      });
      it('Should return `409` if email already exists and not create account', (done) => {
        request.post('/api/v1/auth/signup')
          .set('Content-Type', 'application/json')
          .send(inputs.existingEmail)
            .expect(409)
            .end((err, res) => {
              expect(res.status).to.eql(409);
              expect(res.body.success).to.eql(false);
              expect(res.body.errors).to.have.property('email').eql('Email already exist');
                if (err) done(err);
                done();
            });
      });

      it('should return `400` status code with errors message for empty request', (done) => {
        request.post('/api/v1/auth/signup')
            .set('Content-Type', 'application/json')
            .send(inputs.emptyData) // empty body request
            .expect(400)
            .end((err, res) => {
                expect(res.body.userName).to.eql('userName is required');
                expect(res.body.fullName).to.eql('Full name is required');
                expect(res.body.email).to.eql('Email is required');
                expect(res.body.password).to.eql('password is required');
                expect(res.status).to.equal(400);
                done();
            });
       });
    });
  });

  describe('All Test cases for user login', () => {
    describe('Negative Test case for user login', () => {
      it('Should return `401` for wrong user input', (done) => {
        request.post('/api/v1/auth/login')
          .set('Content-Type', 'application/json')
          .send(inputs.invalidUserNamePassword)
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
         });
      });
      it('Should return `400` and deny access if wrong userName is not entered', (done) => {
        request.post('/api/v1/auth/login')
          .set('Content-Type', 'application/json')
          .send(inputs.noUsername)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.userName).to.eql('userName is required');
            done();
         });
      });
      it('Should return `400` and deny access if wrong Password is not entered', (done) => {
        request.post('/api/v1/auth/login')
          .set('Content-Type', 'application/json')
          .send(inputs.noPassword)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res.body.password).to.eql('Password is required');
            done();
         });
      });
    });
    describe('Positive Test case for user login', () => {
      it('Should return `200` for authenticated user details', (done) => {
        request.post('/api/v1/auth/login')
          .set('Content-Type', 'application/json')
          .send(inputs.userOneLogin)
          .end((err, res) => {
            console.log(res.body.token);
            userToken.token = res.body.token;
            expect(res.body).to.haveOwnProperty('token');
            expect(res).to.have.status(200);
            done();
         });
      });
    });
  });

  describe('All Test cases for user profile', () => {
    describe('get user profile details test cases', () => {
      it('should not be able to access the profile when'+
      'token is undefined(not set)', (done) => {
        request.get('/api/v1/user/profile')
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body).deep.equal({
              success: false,
              errors: 'Access denied. You are not logged in'
            });
            if (err) done(err);
            done();
          });
      });
      it('should not be able to access user\'s profile with a wrong token', (done) => {
        request.get('/api/v1/user/profile')
          .set('x-access-token', wrongToken)
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body).deep.equal({
              success: false,
              errors: 'Authentication failed. Token is invalid or expired'
            });
            if (err) done(err);
            done();
          });
      });
      it('should be able to get all user\'s current information', (done) => {
        request.get('/api/v1/user/profile')
          .set('x-access-token', userToken.token)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });
    });
    describe('Negative Test case for user profile update', () => {
      it('Should return `422` status code for invalid inputs', (done) => {
        request.put('/api/v1/user/profile')
        .set('x-access-token', userToken.token)
        .send(inputs.incompleteUpdate)
        .end((err, res) => {
          expect(res).to.have.status(422);
          expect(res.body.success).to.eql(false);
          expect(res.body.errors).to.eql('Some or all fields are undefined');
          if (err) done(err);
          done();
        });
      });
      it('should return `400` status code with errors message for empty request', (done) => {
        request.put('/api/v1/user/profile')
          .set('x-access-token', userToken.token)
          .send(inputs.emptyUpdate) // empty body request
          .expect(400)
          .end((err, res) => {
            expect(res.body.userName).to.eql('userName is required');
            expect(res.body.fullName).to.eql('Full name is required');
            expect(res.body.email).to.eql('Email is required');
            expect(res.status).to.equal(400);
            done();
          });
       });
    });
    describe('Positive Test case for user profile update', () => {
      it('Should return `200` for valid user update', (done) => {
        request.put('/api/v1/user/profile')
          .set('x-access-token', userToken.token)
          .send(inputs.validUpdate)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
         });
      });
    });
  });
});

  export default userToken;