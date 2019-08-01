const httpUtils = require('../utils/http-utils');

const urlBase = 'https://api.github.com';
const usersUrl = `${urlBase}/users`;

describe(`Given ${urlBase} domain is up`, () => {
  describe(`when ${usersUrl} resource is called `, () => {
    let time = null;
    const expectedTime = 5000;

    beforeAll(async () => {
      time = await httpUtils.authGetResponseTimeSync(usersUrl);
    });

    it(`then the response time should be less than ${expectedTime} miliseconds`, () => {
      expect(time).toBeLessThan(expectedTime);
    });
  });
});
