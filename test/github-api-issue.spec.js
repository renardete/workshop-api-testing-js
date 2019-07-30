const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');
const httpUtils = require('../utils/http-utils');

const urlBase = 'https://api.github.com';
const userName = 'renardete';

describe(`Given ${urlBase} domain is up`, () => {
  describe(`when ${urlBase}/user resource is called`, () => {
    const loggedUser = `${urlBase}/user`;
    let response = {};

    beforeAll(async () => {

      response = await httpUtils.authGetSync(loggedUser);

      response = await httpUtils.authGetSync(response.body.repos_url);
    });

    it('then the response should contain at least one repository', async () => {
      expect(response.status).toBe(statusCode.OK);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe(`when ${urlBase}/user resource is called`, () => {
    const loggedUser = `${urlBase}/user`;
    let response = {};
    const repoName = 'workshop-api-testing-js';
    let apiWorkshopRepo = {};

    beforeAll(async () => {

      response = await httpUtils.authGetSync(loggedUser);
      response = await httpUtils.authGetSync(response.body.repos_url);
      apiWorkshopRepo = response.body.find(respository => respository.name === repoName);
      response = await httpUtils.authGetSync(`${urlBase}/repos/${userName}/${repoName}`);

    });

    it('then the response should contain the name and id of the selected repository', async () => {
      expect(response.status).toBe(statusCode.OK);
      expect(response.body.name).toBe(apiWorkshopRepo.name);
      expect(response.body.id).toBe(apiWorkshopRepo.id);
    });
  });

  describe('and issues service is up', () => {
    const emptyString = null;
    let responsePost = {};
    let responsePut = {};
    const repoName = 'workshop-api-testing-js';


    describe(`when ${urlBase}/repos/${userName}/${repoName}/issues resource is called`, () => {
      const bodyPost = {
        title: 'A new issue '
      };

      beforeAll(async () => {
        responsePost = await agent
          .post(`${urlBase}/repos/${userName}/${repoName}/issues`)
          .auth('token', process.env.ACCESS_TOKEN)
          .set('User-Agent', 'agent')
          .send(bodyPost);
      });

      it(`then the response should contain the issue title ${bodyPost.title} and body must be empty`, async () => {
        expect(responsePost.status).toBe(statusCode.CREATED);
        expect(responsePost.body.title).toBe(bodyPost.title);
        expect(responsePost.body.body).toEqual(emptyString);
      });
    });

    describe(`when ${urlBase}/repos/${userName}/${repoName}/issues/:numberIssue resource is called`, () => {

      const bodyPatch = {
        body: 'new boddy for issue'
      };

      beforeAll(async () => {
        responsePut = await agent
          .patch(`${urlBase}/repos/${userName}/${repoName}/issues/${responsePost.body.number}`)
          .auth('token', process.env.ACCESS_TOKEN)
          .set('User-Agent', 'agent')
          .send(bodyPatch);
      });

      it('then the response should contain the name and id of the selected repository', async () => {
        expect(responsePut.status).toBe(statusCode.OK);
        expect(responsePut.body.title).toBe(responsePost.body.title);
        expect(responsePut.body.body).toEqual(bodyPatch.body);
      });
    });
  });
});
