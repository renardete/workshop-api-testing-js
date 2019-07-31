const statusCode = require('http-status-codes');
const httpUtils = require('../utils/http-utils');

const urlBase = 'https://api.github.com';

describe(`Given ${urlBase} domain is up`, () => {
  describe('when ', () => {
    const redirectTestUrl = 'https://github.com/aperdomob/redirect-test';
    let response = {};

    beforeAll(async () => {
      response = await httpUtils.authHeadSync(redirectTestUrl);
    });

    it('then', () => {
      expect(response.status).toBe(statusCode.MOVED_TEMPORARILY);
      expect(response.headers.location).toBe();
    });
  });
});
