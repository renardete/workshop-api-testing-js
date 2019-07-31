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
});
