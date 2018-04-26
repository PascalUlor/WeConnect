/**
 * Test for API endpoints
 */
import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai,
    request = supertest(app);


describe('Test case for loading application home page', () => {
    it('should load application home page', (done) => {
        request.get('/')
            .set('Content-Type', 'application/json')
            .expect(200)
            .end((err, res) => {
                expect(res.body).deep.equal({
                    name: 'Welcome to WeConnect',
                    message: 'Get Your Business To The World'
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