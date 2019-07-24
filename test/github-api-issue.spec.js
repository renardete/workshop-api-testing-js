const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');

const urlBase = 'https://api.github.com';
const userName = 'renardete';

describe(`Given ${urlBase} domain is up`, () => {
  describe(`when ${urlBase}/user resource is called`, () => {
    const loggedUser = `${urlBase}/user`;
    let response = {};

    beforeAll(async () => {
      response = await agent
        .get(loggedUser)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      response = await agent
        .get(response.body.repos_url)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
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
      response = await agent
        .get(loggedUser)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      response = await agent
        .get(response.body.repos_url)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      apiWorkshopRepo = response.body.find(respository => respository.name === repoName);

      response = await agent
        .get(`${urlBase}/repos/${userName}/${repoName}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
    });

    it('then the response should contain the name and id of the selected repository', async () => {
      expect(response.status).toBe(statusCode.OK);
      expect(response.body.name).toBe(apiWorkshopRepo.name);
      expect(response.body.id).toBe(apiWorkshopRepo.id);
    });
  });


  describe('', () => {
    const emptyString = null;
    let responsePost = {};
    let responsePut = {};
    const repoName = 'workshop-api-testing-js';

    const bodyPost = {
      title: 'A new issue '
    };

    const bodyPatch = {
      body: 'new boddy for issue'
    };

    beforeAll(async () => {
      responsePost = await agent
        .post(`${urlBase}/repos/${userName}/${repoName}/issues`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent')
        .send(bodyPost);

      responsePut = await agent
        .patch(`${urlBase}/repos/${userName}/${repoName}/issues/${responsePost.body.number}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent')
        .send(bodyPatch);
    });

    describe(`when ${urlBase}/repos/${userName}/${repoName}/issues resource is called`, () => {
      it(`then the response should contain the issue title ${bodyPost.title} and body must be empty`, async () => {
        expect(responsePost.status).toBe(statusCode.CREATED);
        expect(responsePost.body.title).toBe(bodyPost.title);
        expect(responsePost.body.body).toEqual(emptyString);
      });
    });

    describe(`when ${urlBase}/repos/${userName}/${repoName}/issues/:numberIssue resource is called`, () => {
      it('then the response should contain the name and id of the selected repository', async () => {
        expect(responsePut.status).toBe(statusCode.OK);
        expect(responsePut.body.title).toBe(responsePost.body.title);
        expect(responsePut.body.body).toEqual(bodyPatch.body);
      });
    });
  });
});
