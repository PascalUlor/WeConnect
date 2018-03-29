/**
 * Test for dummy data API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import models from '../models';

const { User, Business, Reviews } = models;

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
            password: 'password',
            location: '',
            profileImage: '',
            aboutMe: ''
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
            password: '123',
            location: 'lagos',
            profileImage: 'mypix',
            aboutMe: 'I am the CEO of ulorseries. Thanks'
            })
            .expect(400)
            .end((err, res) => {
              expect(res.body.success).to.equal('False');
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
              password: '',
              location: '',
              profileImage: '',
              aboutMe: ''
            }) // empty body request
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
    describe('Positive Test case for user signup', () => {
      it('Should return `201` for unique username signups', (done) => {
        request.post('/api/v1/auth/signup')
          .set('Content-Type', 'application/json')
          .send({
            fullName: 'BruceBanner',
            email: 'banner@yahoo.com',
            userName: 'hulk',
            password: 'bruce banner',
            location: 'newyork',
            profileImage: 'mypix',
            aboutMe: 'I am hulk of the Avengers'
          })
          .expect(201)
              .end((err, res) => {
                expect(res.body.success).to.equal('True');
                expect(res.body).to.haveOwnProperty('token');
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
            userName: 'hulk',
            password: 'bruce banner'
            })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
         });
      });
    });
  });