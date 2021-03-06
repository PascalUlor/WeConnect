/**
 * Test for dummy data API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import db from '../dataModel/testData';

chai.use(chaiHttp);
const { expect } = chai,
    request = supertest(app);

describe('All Test cases for user Signup', () => {
    describe('Negative Test case for user signup', () => {
      it('Should return `400` if some fields are not filled', (done) => {
        request.post('/api/v1/auth/signup')
          .set('Content-Type', 'application/json')
          .send({
            fullName: 'Dara',
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
            fullName: 'Mike',
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
      it('Should return `500` if password is not hashed', (done) => {
        request.post('/api/v1/auth/signup')
          .set('Content-Type', 'application/json')
          .send({})
            .expect(500)
            .end((err, res) => {
              expect(res.body.password).to.equal(undefined);
              expect(res.status).to.equal(500);
                done();
            });
      });

      it('should return `400` status code with errors message for empty request', (done) => {
        request.post('/api/v1/auth/signup')
            .set('Content-Type', 'application/json')
            .send({
              userName: '',
              fullName: '',
              email: '',
              password: ''
            }) // empty body request
            .expect(400)
            .end((err, res) => {
                expect(res.body.userName).to.eql('userName is required');
                expect(res.body.fullName).to.eql('fullName is required');
                expect(res.body.email).to.eql('email is required');
                expect(res.body.password).to.eql('password is required');
                expect(res.status).to.equal(400);
                done();
            });
       });
    });
    describe('Positive Test case for user signup', () => {
      it('Should return `200` for unique username signups', (done) => {
        request.post('/api/v1/auth/signup')
          .set('Content-Type', 'application/json')
          .send({
            fullName: 'Barry Allen',
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