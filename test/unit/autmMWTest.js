var expect = require('chai').expect;
var authMW = require('../../middlewares/generic/authMW');

describe('Auth middleware ', function () {

    it('should redirect to "login" when not logged in', function (done) {
        let reqMock = {
            session: {
                belepve:false,
            } 
        };

        let resMock = {
            redirect: function (to) {
                expect(to).to.be.equal('/login');
                done();
            },
            locals:{}
        };
        authMW({})(reqMock,resMock,()=>{});
    });

    // Increase branch coverage
    it('should redirect to "login" when not req.session.belepve is undefined', function (done) {
        let reqMock = {
            session: {
            } 
        };

        let resMock = {
            redirect: function (to) {
                expect(to).to.be.equal('/login');
                done();
            },
            locals:{}
        };
        authMW({})(reqMock,resMock,()=>{});
    });

    it('should call next and set isAuthenticated when loggen in', function (done) {
        let reqMock = {
            session: {
                belepve:true,
                _userid: 'sadad,khu32',
                cookie:{}
            } 
        };

        let resMock = {
            redirect: function (to) {
                expect(to).to.be.equal('/login');
                done();
            },
            locals:{}
        };
        authMW({})(reqMock,resMock,()=>{
            expect(resMock.locals.isAuthenticated).to.be.true;
            expect(resMock.locals._userId).to.be.equal(reqMock.session._userid);
            expect(reqMock.session.cookie.maxAge).to.be.equal(180000);
            done();
        });
    });
});