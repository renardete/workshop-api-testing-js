const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

describe('First Api Tests', () => {
  it('Consume GET Service', () => agent.get('https://httpbin.org/ip').then((response) => {
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('origin');
  }));

  it('Consume GET Service with query parameters', () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };

    return agent.get('https://httpbin.org/get')
      .query(query)
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body.args).to.eql(query);
      });
  });

  it('Consume HEAD Service', () => agent.head('https://httpbin.org/get')
    .then((response) => {
      expect(response.status).to.equal(statusCode.OK);
      expect(response.body).to.be.empty;
    }));

  it('Consume PATCH Service', () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };

    return agent.patch('https://httpbin.org/patch')
      .query(query)
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body.args).to.eql(query);
      });
  });

  it('Consume PUT Service', () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };


    return agent.put('https://httpbin.org/put')
      .query(query)
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body.args).to.eql(query);
      });
  });

  it('Consume DELETE Service', () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };

    return agent.del('https://httpbin.org/delete')
      .query(query)
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body.args).to.eql(query);
      });
  });
});
