const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');

const urlBase = 'https://httpbin.org';

describe('First Api Tests', () => {
  it('Consume GET Service', () => agent.get(`${urlBase}/ip`).then((response) => {
    expect(response.status).toBe(statusCode.OK);
    expect(response.body).toHaveProperty('origin');
  }));

  it('Consume GET Service with query parameters', () => {
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

  it('Consume HEAD Service', () => agent.head(`${urlBase}/get`)
    .then((response) => {
      const emptyBody = {};
      expect(response.status).toBe(statusCode.OK);
      expect(response.body).toEqual(emptyBody);
    }));

  it('Consume PATCH Service', () => {
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

  it('Consume PUT Service', () => {
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
