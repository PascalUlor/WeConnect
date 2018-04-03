/**
 * Test for API endpoints
 */
import { userToken, request, expect, wrongToken } from './user.test';
import review from './testData/review.data';

const invalidID = 50;

    describe('Test cases for posting business reviews', () => {
      describe('Negative test case for posting reviews', () => {
        it('should return `404` status code if business does not exist', (done) => {
            request.post(`/api/v1/businesses/${invalidID}/reviews`)
              .set('x-access-token', userToken.token)
              .send(review.validReview)
              .expect(404)
              .end((err, res) => {
                expect(res.body.message).to.equal('Business does not exist');
                done();
              });
          });
          });

      describe('Positive test case for posting reviews', () => {
        it('should return `201` status code for successfull review posts', (done) => {
            request.post('/api/v1/businesses/2/reviews')
              .set('x-access-token', userToken.token)
              .send(review.validReview)
              .expect(200)
              .end((err, res) => {
                expect(res.body.success).to.equal(true);
                expect(res.body.message).to.equal('Successfully posted new review');
                expect(res.body.newReview);
                done();
              });
          });
      });
    });


    describe('Test cases for Retrieving reviews', () => {
      describe('Positive case for GET Reviews', () => {
        it('Should return 200 for getting reviews', (done) => {
          request.get('/api/v1/businesses/2/reviews')
            .set('Content-Type', 'application/json')
            .send()
            .end((err, res) => {
               expect(res.body.success).to.equal(true);
               expect(res.body.message).to.equal('Successfully Retrieved All Reviews For This Business');
               expect(res.body.Review);
               expect(res.status).to.equal(200);
               done();
        });
       });
      });
      describe('Negative case for GET Reviews', () => {
        it('Should return 404 for reviews that does not exist', (done) => {
          request.get(`/api/v1/businesses/${invalidID}/reviews`)
            .set('Content-Type', 'application/json')
            .send()
            .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Business does not exist');
            done();
          });
        });
      });
    });