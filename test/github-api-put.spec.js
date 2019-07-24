const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');

const urlBase = 'https://api.github.com';

describe(`Given ${urlBase} domain is up`, () => {
  describe('when https://api.github.com/user/following/aperdomob resource is calles', () => {
    const followUrl = `${urlBase}/user/following/aperdomob`;
    const emptyBody = {};
    let response = {};

    beforeAll(async () => {
      response = await agent
        .put(followUrl)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
    });

    it('then the response should contain status-code = 204 and the body must be empty', async () => {
      response = await agent
        .put(followUrl)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      expect(response.statusCode).toBe(statusCode.NO_CONTENT);
      expect(response.body).toEqual(emptyBody);
    });
  });

  describe('when https://api.github.com/user/following resource is called', () => {
    const followUrl = `${urlBase}/user/following`;
    const followedName = 'aperdomob';
    const followedId = 17033942;
    let response = {};
    let followedUser = {};

    beforeAll(async () => {
      response = await agent
        .get(followUrl)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      followedUser = response.body.find(user => user.login === followedName);
    });

    it(`then the response should contain status-code OK (200) and the body must contain login: ${followedName} and id: ${followedId}`, async () => {
      expect(response.statusCode).toBe(statusCode.OK);
      expect(followedUser.login).toBe(followedName);
      expect(followedUser.id).toBe(followedId);
    });
  });

  describe('when https://api.github.com/user/following/aperdomob resource is calles', () => {
    const followUrl = `${urlBase}/user/following/aperdomob`;
    let originalResponse = {};
    let repeatedResponse = {};

    beforeAll(async () => {
      originalResponse = await agent
        .put(followUrl)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');

      repeatedResponse = await agent
        .put(followUrl)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
    });
    it('then the response should contain status-code = 204 and the body must be empty', async () => {
      expect(originalResponse.statusCode).toBe(repeatedResponse.statusCode);
      expect(originalResponse.body).toEqual(repeatedResponse.body);
    });
  });
});
