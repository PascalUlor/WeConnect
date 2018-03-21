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
    request = supertest(app),
    invalidID = 50;

    describe('Test cases for posting business reviews', () => {
      describe('Negative test case for posting reviews', () => {
        it('should return `400` status code with `res.body` error message', (done) => {
            request.post(`/api/v1/businesses/${invalidID}/reviews`)
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

      // describe('Positive test case for posting reviews', () => {
      //   it('should return `201` status code for successfull review posts', (done) => {
      //       request.post('/api/v1/businesses/2/reviews')
      //         .set('Content-Type', 'application/json')
      //         .send({
      //           id: 1,
      //           reviewDetail: 'Quality',
      //           userId: 3,
      //           businessId: 1
      //         })
      //         .expect(201)
      //         .end((err, res) => {
      //           expect(res.body.status).to.equal('Successfull');
      //           expect(res.body.message).to.equal('Successfull');
      //           expect(db.reviewsData);
      //           done();
      //         });
      //     });
      // });
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
          request.get(`/api/v1/businesses/${invalidID}/reviews`)
            .set('Content-Type', 'application/json')
            .send({})
            .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.status).to.equal('failed');
            expect(res.body.message).to.equal('failed to retrieved reviews');
            done();
          });
        });
      });
    });