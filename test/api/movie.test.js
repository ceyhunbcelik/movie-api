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

    describe('/POST movies', () => {
        it('it should post a movie', (done) => {

            const movie = {
                title: 'Udemy',
                director_id: '5a34e1afb8523a78631f8540',
                category: 'Comedy',
                country: 'Turkey',
                year: 1950,
                imdb_score: 8
            };

            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');

                    done();
                });
        })
    });

});