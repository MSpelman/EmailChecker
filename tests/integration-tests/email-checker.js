const request = require('supertest');
const express = require('express');
const chai = require('chai');
const expect = chai.expect;
const app = express();

describe('Email Checker Controller Unit Tests:', () => {
    before((done) => {
        done();
    });

    beforeEach((done) => {
        done();
    });

    describe('Testing POST on root: routes.email-checker', () => {
        it('should consider all these emails the same', (done) => {
            request('http://localhost:3000').post('/')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send([
                    "test.email@gmail.com",
                    "test.email+spam@gmail.com",
                    "testemail@gmail.com"
                ])
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.a('number');
                    expect(res.body).to.equal(1);
                    done();
                });
        });

        it('should handle multiple unique email addresses', (done) => {
            request('http://localhost:3000').post('/')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send([
                    "fake.email@gmail.com",
                    "test.email@gmail.com",
                    "test.email+spam@gmail.com",
                    "testemail@gmail.com",
                    "testemail@example.com"
                ])
                .expect('Content-Type', /json/)
                .expect(200)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.body).to.be.a('number');
                    expect(res.body).to.equal(3);
                    done();
                });
        });

        it('should not allow a null request body', (done) => {
            request('http://localhost:3000').post('/')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send()
                .expect(400)
                .end((err, res) => {
                    done();
                });
        });

        it('should not allow an empty request body', (done) => {
            request('http://localhost:3000').post('/')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({})
                .expect(400)
                .end((err, res) => {
                    done();
                });
        });

        it('should not allow an empty list', (done) => {
            request('http://localhost:3000').post('/')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send([])
                .expect(400)
                .end((err, res) => {
                    done();
                });
        });

        it('should not allow improperly formatted email addresses', (done) => {
            request('http://localhost:3000').post('/')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send([
                    "test.emailgmail.com",
                    "test.email+spam@gmail.com",
                    "testemail@gmail.com"
                ])
                .expect(400)
                .end((err, res) => {
                    done();
                });
        });
    });

    after((done) => {
        done();
    });
});