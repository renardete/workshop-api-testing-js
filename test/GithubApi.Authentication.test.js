const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');

const urlBase = 'https://api.github.com';
const githubUserName = 'renardete';
const repository = 'workshop-api-testing-js';

describe(`Given the ${urlBase} is Up and an Access token was generated`, () => {
  describe('when resource /respos/{user}/repository is call with the Header for autentication', () => {
    it('then the response must be OK and the body should contain the description of the repository', async () => {
      const response = await agent.get(`${urlBase}/repos/${githubUserName}/${repository}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      expect(response.status).toBe(statusCode.OK);
      expect(response.body.description).toBe('This is a Workshop about Api Testing in JavaScript');
    });
  });

  describe('when resource /respos/{user}/repository is call with parameters used for autentication', () => {
    it('then the response must be OK and the body should contain the description of the repository', async () => {
      const response = await agent.get(`${urlBase}/repos/${githubUserName}/${repository}`)
        .set('User-Agent', 'agent')
        .query(`access_token=${process.env.ACCESS_TOKEN}`);
      expect(response.status).toBe(statusCode.OK);
      expect(response.body.description).toBe('This is a Workshop about Api Testing in JavaScript');
    });
  });
});
