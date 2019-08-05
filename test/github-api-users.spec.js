const httpUtils = require('../utils/http-utils');

const urlBase = 'https://api.github.com';
const urlTenUsers = `${urlBase}/users?per_page=10`;
const urlFiftyUsers = `${urlBase}/users?per_page=50`;

describe(`Given ${urlBase} domain is up`, () => {
  describe(`when resource ${urlBase}/users is called `, () => {
    let time = null;
    const usersUrl = `${urlBase}/users`;

    const expectedTime = 5000;

    beforeAll(async () => {
      time = await httpUtils.authGetResponseTimeSync(usersUrl);
    });
    it(`then the response time should be inferior to ${expectedTime} milliseconds`, () => {
      expect(time).toBeLessThan(expectedTime);
    });
  });

  describe(`when resource ${urlTenUsers} is called `, () => {
    let response = {};

    beforeAll(async () => {
      response = await httpUtils.authGetSync(urlTenUsers);
    });

    it('then the body of the response should contain a list of 10 users', () => {
      const numberUsers = response.body.length;
      expect(numberUsers).toBe(10);
    });
  });

  describe(`when resource ${urlFiftyUsers} is called `, () => {
    let response = {};

    beforeAll(async () => {
      response = await httpUtils.authGetSync(urlFiftyUsers);
    });

    it('then the body of the response should contain a list of 50 users', () => {
      const numberUsers = response.body.length;
      expect(numberUsers).toBe(50);
    });
  });
});
