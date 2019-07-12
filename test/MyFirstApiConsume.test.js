const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');

const urlBase = 'https://httpbin.org';
describe(`Given the ${urlBase} is Up`, () => {
  describe('When the /ip resource is called', () => {
    it('Then it should respond OK and have property origin', () => agent.get(`${urlBase}/ip`).then((response) => {
      expect(response.status).toBe(statusCode.OK);
      expect(response.body).toHaveProperty('origin');
    }));
  });

  describe('When the /ip resource is called with QueryParams', () => {
    it('Then it should respond OK and have property origin', () => {
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

  describe('When the /get resource is called with the HEAD method', () => {
    it('Then it should respond OK and the body must be empty', () => agent.head(`${urlBase}/get`)
      .then((response) => {
        const emptyBody = {};
        expect(response.status).toBe(statusCode.OK);
        expect(response.body).toEqual(emptyBody);
      }));
  });

  describe('When the /patch resource is called with QueryParams', () => {
    it('Then it should respond OK and the body must contain the QueryParams in the request', () => {
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

  describe('When the /put resource is called with QueryParams', () => {
    it('Then it should respond OK and the body must contain the QueryParams in the request', () => {
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

  describe('When the /delete resource is called with QueryParams', () => {
    it('Consume DELETE Service', () => {
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
