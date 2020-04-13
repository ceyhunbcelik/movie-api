const server = require('../../app');

const chaiHttp = require('chai-http');
const chai = require('chai');

const should = chai.should();

chai.use(chaiHttp);

let token;

describe('/api/movies test', () => {

    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({ username: 'user2', password: '12345' })
            .end((err, res) => {
                token = res.body.token;
                //console.log(token);
                done();
            });
    });

    describe('(GET /) movies', () => {
        it('it should get all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

});