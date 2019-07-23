const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');
const download = require('download');
const fs = require('fs');

const urlBase = 'https://api.github.com';
const githubUserName = 'aperdomob';

describe(`Given than ${urlBase} is UP`, () => {
  describe(`when the resource ${urlBase}/users/${githubUserName} is called`, () => {
    it('then the response body should contain the name, company and location of the user', async () => {
      const response = await agent
        .get(`${urlBase}/users/${githubUserName}`)
        .set('User-Agent', 'agent');
      expect(response.status).toBe(statusCode.OK);
      expect(response.body.name).toBe('Alejandro Perdomo');
      expect(response.body.company).toBe('PSL');
      expect(response.body.location).toBe('Colombia');
    });
  });

  describe('when the resource of repositories of user is called', () => {
    it('then response body should contain the name, publication state and description of the repo', async () => {
      let response = await agent
        .get(`${urlBase}/users/${githubUserName}`)
        .set('User-Agent', 'agent');
      response = await agent
        .get(response.body.repos_url)
        .set('User-Agent', 'agent');
      const jasmineAwesomeRepository = await response.body
        .find(respository => respository.name === 'jasmine-awesome-report');
      expect(response.status).toBe(statusCode.OK);
      expect(jasmineAwesomeRepository.name).toBe('jasmine-awesome-report');
      expect(jasmineAwesomeRepository.private).toBe(false);
      expect(jasmineAwesomeRepository.description).toBe('An awesome html report for Jasmine');
    });
  });

  describe('when the resource of zip download of repositories is called', () => {
    it('Zip download', async () => {
      let response = await agent
        .get(`${urlBase}/users/${githubUserName}`)
        .set('User-Agent', 'agent');
      response = await agent
        .get(response.body.repos_url)
        .set('User-Agent', 'agent');
      const jasmineAwesomeRepository = await response.body
        .find(respository => respository.name === 'jasmine-awesome-report');
      let zipUrl = await jasmineAwesomeRepository.archive_url.replace('{archive_format}', 'zipball');
      const zipFilePath = './file-downloads/jasmine.zip';
      zipUrl = await zipUrl.replace('{/ref}', '/master');
      agent
        .get(zipUrl)
        .set('User-Agent', 'agent')
        .pipe(fs.createWriteStream(zipFilePath));
      const exists = fs.existsSync(zipFilePath);
      expect(exists).toBe(true);
    }, 15000);
  });

  describe('when contents resouce of a repositorie is called', () => {
    it('then the response body should contain the name, path and sha of the README.md file', async () => {
      let response = await agent.get(`${urlBase}/users/${githubUserName}`)
        .set('User-Agent', 'agent');
      response = await agent.get(response.body.repos_url)
        .set('User-Agent', 'agent');
      const jasmineAwesomeRepository = await response.body
        .find(respository => respository.name === 'jasmine-awesome-report');
      const contentUrl = await jasmineAwesomeRepository.contents_url.replace('/{+path}', '');
      response = await agent
        .get(contentUrl)
        .set('User-Agent', 'agent');
      const readmeInfo = await response.body.find(content => content.name === 'README.md');

      expect(response.status).toBe(statusCode.OK);
      expect(readmeInfo.name).toBe('README.md');
      expect(readmeInfo.path).toBe('README.md');
      expect(readmeInfo.sha).toBe('b9900ca9b34077fe6a8f2aaa37a173824fa9751d');
    });
  });

  describe('when README.md resource is called', () => {
    it('then the download must be succesfull', async () => {
      let response = await agent.get(`${urlBase}/users/${githubUserName}`)
        .set('User-Agent', 'agent');
      response = await agent.get(response.body.repos_url)
        .set('User-Agent', 'agent');
      const jasmineAwesomeRepository = await response.body
        .find(respository => respository.name === 'jasmine-awesome-report');
      const contentUrl = await jasmineAwesomeRepository.contents_url.replace('/{+path}', '');
      response = await agent
        .get(contentUrl)
        .set('User-Agent', 'agent');
      const readmeInfo = await response.body.find(content => content.name === 'README.md');
      await download(readmeInfo.download_url, 'file-downloads');

      const exists = fs.existsSync('./file-downloads/README.md');
      expect(exists).toBe(true);
    });
  });
});
