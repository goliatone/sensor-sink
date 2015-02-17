var superagent = require('superagent');
var expect = require('expect.js');
var generateUUID = require('../lib/mongoose-uuid').generateUUID;

describe('express rest API for devices', function() {
    var ID,
        UUID = generateUUID();

    it('post object', function(done) {
        superagent.post('http://localhost:3000/api/devices')
            .send({
                uuid: UUID,
                _type: 1
            })
            .end(function(e, res) {
                // console.log(res.body)
                // console.log('============')
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body._id);
                ID = res.body._id;
                done();
            });
    });

    it('retrieves an object', function(done) {
        superagent.get('http://localhost:3000/api/devices/' + ID)
            .end(function(e, res) {
                // console.log(res.body)
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body._id);
                expect(res.body._id).to.eql(ID);
                done();
            });
    });

    it('retrieves a collection', function(done) {
        superagent.get('http://localhost:3000/api/devices')
            .end(function(e, res) {
                // console.log(res.body)
                expect(e).to.eql(null);
                expect(res.body.length).to.be.above(0);
                expect(res.body.map(function(item) {
                    return item._id;
                })).to.contain(ID);
                done();
            });
    });

    it('updates an object', function(done) {
        superagent.put('http://localhost:3000/api/devices/' + ID)
            .send({
                _type: 1
            })
            .end(function(e, res) {
                // console.log(res.body)
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                done();
            });
    });

    it('checks an updated object', function(done) {
        superagent.get('http://localhost:3000/api/devices/' + ID)
            .end(function(e, res) {
                // console.log(res.body)
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                expect(res.body._id.length);
                expect(res.body._id).to.eql(ID);
                expect(res.body._type).to.eql(1);
                done();
            });
    });

    it('removes an object', function(done) {
        superagent.del('http://localhost:3000/api/devices/' + ID)
            .end(function(e, res) {
                // console.log(res.body)
                expect(e).to.eql(null);
                expect(typeof res.body).to.eql('object');
                done();
            });
    });
});
