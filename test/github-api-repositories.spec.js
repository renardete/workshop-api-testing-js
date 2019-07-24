const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');
const download = require('download');
const fs = require('fs');

const urlBase = 'https://api.github.com';
const githubUserName = 'aperdomob';

describe(`Given than ${urlBase} is UP`, () => {
  describe(`when the resource ${urlBase}/users/${githubUserName} is called`, () => {
    let response = {};
    beforeAll(async () => {
      response = await agent
        .get(`${urlBase}/users/${githubUserName}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
    });

    it('then the response body should contain the name, company and location of the user', async () => {
      expect(response.status).toBe(statusCode.OK);
      expect(response.body.name).toBe('Alejandro Perdomo');
      expect(response.body.company).toBe('PSL');
      expect(response.body.location).toBe('Colombia');
    });
  });

  describe('when the resource of repositories of user is called', () => {
    let response = {};
    let jasmineAwesomeRepository = {};
    beforeAll(async () => {
      response = await agent
        .get(`${urlBase}/users/${githubUserName}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      response = await agent
        .get(response.body.repos_url)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      jasmineAwesomeRepository = await response.body
        .find(respository => respository.name === 'jasmine-awesome-report');
    });
    it('then response body should contain the name, publication state and description of the repo', async () => {
      expect(response.status).toBe(statusCode.OK);
      expect(jasmineAwesomeRepository.name).toBe('jasmine-awesome-report');
      expect(jasmineAwesomeRepository.private).toBe(false);
      expect(jasmineAwesomeRepository.description).toBe('An awesome html report for Jasmine');
    });
  });

  describe('when the resource of zip download of repositories is called', () => {
    let response = {};
    let jasmineAwesomeRepository = {};
    let zipUrl = '';
    let exists = false;
    let zipFilePath = '';

    beforeAll(async () => {
      response = await agent
        .get(`${urlBase}/users/${githubUserName}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      response = await agent
        .get(response.body.repos_url)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      jasmineAwesomeRepository = await response.body
        .find(respository => respository.name === 'jasmine-awesome-report');
      zipUrl = await jasmineAwesomeRepository.archive_url.replace('{archive_format}', 'zipball');
      zipFilePath = './file-downloads/jasmine.zip';
      zipUrl = await zipUrl.replace('{/ref}', '/master');
      fs.mkdirSync('./file-downloads');
      await agent
        .get(zipUrl)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent')
        .pipe(fs.createWriteStream(zipFilePath));
      exists = fs.existsSync(zipFilePath);
    });

    it('Zip download', async () => {
      expect(exists).toBe(true);
    }, 15000);
  });

  describe('when contents resouce of a repositorie is called', () => {
    let response = {};
    let jasmineAwesomeRepository = {};
    let contentUrl = '';
    let readmeInfo = {};

    beforeAll(async () => {
      response = await agent.get(`${urlBase}/users/${githubUserName}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      response = await agent.get(response.body.repos_url)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      jasmineAwesomeRepository = await response.body
        .find(respository => respository.name === 'jasmine-awesome-report');
      contentUrl = await jasmineAwesomeRepository.contents_url.replace('/{+path}', '');
      response = await agent
        .get(contentUrl)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      readmeInfo = await response.body.find(content => content.name === 'README.md');
    });

    it('then the response body should contain the name, path and sha of the README.md file', async () => {
      expect(response.status).toBe(statusCode.OK);
      expect(readmeInfo.name).toBe('README.md');
      expect(readmeInfo.path).toBe('README.md');
      expect(readmeInfo.sha).toBe('b9900ca9b34077fe6a8f2aaa37a173824fa9751d');
    });
  });

  describe('when README.md resource is called', () => {
    let response = {};
    let jasmineAwesomeRepository = {};
    let contentUrl = '';
    let exists = false;
    let readmeInfo = {};

    beforeAll(async () => {
      response = await agent.get(`${urlBase}/users/${githubUserName}`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      response = await agent.get(response.body.repos_url)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      jasmineAwesomeRepository = await response.body
        .find(respository => respository.name === 'jasmine-awesome-report');
      contentUrl = await jasmineAwesomeRepository.contents_url.replace('/{+path}', '');
      response = await agent
        .get(contentUrl)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');
      readmeInfo = await response.body.find(content => content.name === 'README.md');
      await download(readmeInfo.download_url, 'file-downloads');

      exists = fs.existsSync('./file-downloads/README.md');
    });

    it('then the download must be succesfull', async () => {
      expect(exists).toBe(true);
    });
  });
});
