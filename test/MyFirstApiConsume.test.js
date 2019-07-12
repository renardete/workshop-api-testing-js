const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');

const urlBase = 'https://httpbin.org';
describe(`Given the ${urlBase} is Up`, () => {
  describe('when the /ip resource is called', () => {
    it('then it should respond OK and have property origin', () => agent.get(`${urlBase}/ip`).then((response) => {
      expect(response.status).toBe(statusCode.OK);
      expect(response.body).toHaveProperty('origin');
    }));
  });

  describe('when the /ip resource is called with QueryParams', () => {
    it('then it should respond OK and have property origin', () => {
      const query = {
        name: 'John',
        age: '31',
        city: 'New York'
      };

      return agent.get(`${urlBase}/get`)
        .query(query)
        .then((response) => {
          expect(response.status).toBe(statusCode.OK);
          expect(response.body.args).toEqual(query);
        });
    });
  });

  describe('when the /get resource is called with the HEAD method', () => {
    it('then it should respond OK and the body must be empty', () => agent.head(`${urlBase}/get`)
      .then((response) => {
        const emptyBody = {};
        expect(response.status).toBe(statusCode.OK);
        expect(response.body).toEqual(emptyBody);
      }));
  });

  describe('when the /patch resource is called with QueryParams', () => {
    it('then it should respond OK and the body must contain the QueryParams in the request', () => {
      const query = {
        name: 'John',
        age: '31',
        city: 'New York'
      };

      return agent.patch(`${urlBase}/patch`)
        .query(query)
        .then((response) => {
          expect(response.status).toBe(statusCode.OK);
          expect(response.body.args).toEqual(query);
        });
    });
  });

  describe('when the /put resource is called with QueryParams', () => {
    it('then it should respond OK and the body must contain the QueryParams in the request', () => {
      const query = {
        name: 'John',
        age: '31',
        city: 'New York'
      };
      return agent.put(`${urlBase}/put`)
        .query(query)
        .then((response) => {
          expect(response.status).toBe(statusCode.OK);
          expect(response.body.args).toEqual(query);
        });
    });
  });

  describe('when the /delete resource is called with QueryParams', () => {
    it('then it should respond OK and the body must contain the QueryParams in the request', () => {
      const query = {
        name: 'John',
        age: '31',
        city: 'New York'
      };

      return agent.del(`${urlBase}/delete`)
        .query(query)
        .then((response) => {
          expect(response.status).toBe(statusCode.OK);
          expect(response.body.args).toEqual(query);
        });
    });
  });
});
