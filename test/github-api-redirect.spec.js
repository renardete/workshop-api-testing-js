const statusCode = require('http-status-codes');
const httpUtils = require('../utils/http-utils');

const urlBase = 'https://api.github.com';

describe(`Given ${urlBase} domain is up`, () => {
  const redirectTestUrl = 'https://github.com/aperdomob/redirect-test';
  let response = {};

  describe('when https://github.com/aperdomob/redirect-test resource is called with HEAD verb', () => {
    beforeAll(async () => {
      response = await httpUtils.authHeadSync(redirectTestUrl);
    });

    it('then the response should contain status=301 and location header https://github.com/aperdomob/new-redirect-test', () => {
      expect(response.status).toBe(statusCode.MOVED_PERMANENTLY);
      expect(response.headers.location).toBe('https://github.com/aperdomob/new-redirect-test');
    });
  });

  describe('when https://github.com/aperdomob/redirect-test resource is called with GET verb', () => {
     beforeAll(async () => {
      response = await httpUtils.authGetSync(redirectTestUrl);
    });

    it('then the response should contain status=200 and text should contain <!DOCTYPE html>', () => {
      expect(response.status).toBe(statusCode.OK);
      expect(response.res.text).toMatch('<!DOCTYPE html>');
    });
  });
});
