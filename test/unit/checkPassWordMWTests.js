var expect = require('chai').expect;
var checkPassMW = require('../../middlewares/account/checkPassMW');

describe('checkPassword middleware ', function () {
  it('should redirect to "/" on successful authentication', async () => {
    const req = {
      body: {
        username: 'validUsername',
        password: 'validPassword',
      },
      session: {
        save:() =>{}
      },
    };
    let redirectCalled=false;
    const res = {
      redirect: () => {redirectCalled=true;},
      locals: {}
    };

    // Mock the UserModel findOne method
    const findOneStub = (query) => {
      expect(query).to.eql({
        username: 'validUsername',
        password: 'validPassword',
      });

      return Promise.resolve({
        _id: 'validUserId',
      });
    };

    // Stub the UserModel
    const UserModel = {
      findOne: findOneStub
    };

    const objectrepository = { User: UserModel };

    // Call the middleware function
    await checkPassMW(objectrepository)(req, res, () => {});

    // Assertions after the middleware execution
    expect(req.session.belepve).to.be.true;
    // If set to false the test is failing so the test works well
    //expect(req.session.belepve).to.be.false;
    expect(req.session._userid).to.equal('validUserId');
    expect(redirectCalled).to.be.true;
  });
  it('should set error message on failed authentication', async () => {
    const req = {
      body: {
        username: 'invalidUsername',
        password: 'invalidPassword',
      },
      session: {},
    };

    const res = {
      locals: {},
    };

    // Mock the UserModel findOne method
    const findOneStub = () => {
      return Promise.resolve(null);
    };

    // Stub the UserModel
    const UserModel = {
      findOne: findOneStub
    };

    const objectrepository = { User: UserModel };

    // Call the middleware function
    await checkPassMW(objectrepository)(req, res, () => {});

    // Assertions after the middleware execution
    expect(res.locals.usernameError).to.equal('');
    expect(res.locals.passwordError).to.equal('Incorrect password or username!');
  });

  it('should call next middleware if username or password is undefined', async () => {
    const req = {
      body: {},
      session:{}
    };

    const res = {
      locals: {},
    };

    // Stub the UserModel
    const UserModel = {
      findOne: () => {
        // Ensure this method is not called in this scenario
        throw new Error('findOne should not be called');
      },
    };

    const objectrepository = { User: UserModel };

    // Call the middleware function
    await checkPassMW(objectrepository)(req, res, () => {});

    // Assertions after the middleware execution
    expect(req.session.belepve).to.be.undefined;
    expect(req.session._userid).to.be.undefined;
    expect(req.session._userid).to.be.undefined;
    expect(res.locals.usernameError).to.be.undefined;
    expect(res.locals.passwordError).to.be.undefined;
  });

  it('should handle potential errors and send Internal Server Error on catch', async () => {
    const req = {
      body: {
        username: 'validUsername',
        password: 'validPassword',
      },
      session: {},
    };

    const res = {
      status: (statusCode) => {
        // Assert the status code
        expect(statusCode).to.equal(500);

        // Return res for chaining
        return res;
      },
      send: (message) => {
        // Assert the message
        expect(message).to.equal('Internal Server Error');

        // Return res for chaining
        return res;
      },
      locals:{}
    };

    // Mock the UserModel findOne method to throw an error
    const UserModel = {
      findOne: () => {
        // Return a Promise that rejects with an error
        return Promise.reject(new Error('Some error'));
      },
    };

    const objectrepository = { User: UserModel };

    // Call the middleware function
    await checkPassMW(objectrepository)(req, res, () => {});

    // Assertions after the middleware execution
    expect(req.session.belepve).to.be.undefined;
    expect(req.session._userid).to.be.undefined;
    expect(req.session._userid).to.be.undefined;
    expect(res.locals.usernameError).to.be.undefined;
    expect(res.locals.passwordError).to.be.undefined;
  });
});