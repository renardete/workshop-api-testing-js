// const statusCode = require('http-status-codes');
const httpUtils = require('../utils/http-utils');

const urlBase = 'https://api.github.com';

describe(`Given ${urlBase} domain is up`, () => {
  describe(`when resource ${urlBase}/users is called `, () => {
    let time = null;
    const usersUrl = `${urlBase}/users`;
    const expectedTime = 5000;
    beforeAll(async () => {
      time = await httpUtils.authGetResponseTimeSync(usersUrl);
    });

    it(`then the response time should be inferior to ${expectedTime} miliseconds`, () => {
      expect(time).toBeLessThan(expectedTime);
    });
  });

  describe(`when resource ${urlBase}/users?per_page=10 is called `, () => {
    let response = {};
    beforeAll(async () => {
      response = await httpUtils.authGetSync(`${urlBase}/users?per_page=10`);
    });

    it('then the body of the response should contain 10 users', () => {
      const numberUsers = response.body.length;
      expect(numberUsers).toBe(10);
    });
  });

  describe(`when resource ${urlBase}/users?per_page=50 is called `, () => {
    let response = {};
    beforeAll(async () => {
      response = await httpUtils.authGetSync(`${urlBase}/users?per_page=50`);
    });

    it('then the body of the response should contain 50 users', () => {
      const numberUsers = response.body.length;
      expect(numberUsers).toBe(50);
    });
  });
});
