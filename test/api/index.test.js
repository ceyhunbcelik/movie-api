const server = require('../../app');
const chaiHttp = require('chai-http');
const chai = require('chai');

const should = chai.should();

chai.use(chaiHttp);

describe('Node Server', () => {
    
    it('(GET /) Anasayfayı döndürür', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                done(); 
            })
    });
    
});