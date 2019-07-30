const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');
const httpUtils = require('../utils/http-utils');

const urlBase = 'https://api.github.com';

describe(`Given ${urlBase} domain is up and gists resource is public`, () => {
  let responsePost = {};
  let responseResourceGetOriginal = {};
  let responseResourceGetrepeated = {};
  let responseDelete = {};

  describe('when POST /gists resource is called', () => {
    const bodyGist = {
      description: 'Hello World Examples',
      public: true,
      files: {
        hello_world: {
          content: 'class HelloWorld\n   def initialize(name)\n      @name = name.capitalize\n   end\n   def sayHi\n'
        }
      }
    };

    beforeAll(async () => {
      responsePost = await agent
        .post(`${urlBase}/gists`)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent')
        .send(bodyGist);

      responseResourceGetOriginal = await httpUtils.authGetSync(responsePost.body.url);
    });

    it('then the response should contain description, publicState and the contentFile', () => {
      expect(responsePost.status).toBe(statusCode.CREATED);
      expect(responsePost.body.description).toBe(bodyGist.description);
      expect(responsePost.body.public).toBe(bodyGist.public);
      expect(responsePost.body.files.hello_world.content)
        .toBe(bodyGist.files.hello_world.content);
    });

    it('and the resource must be created', () => {
      expect(responseResourceGetOriginal.status).toBe(statusCode.OK);
      expect(responseResourceGetOriginal.body.id).toBe(responsePost.body.id);
    });
  });

  describe('when DELETE /gists/:gist_id resource is called', () => {
    beforeAll(async () => {
      responseDelete = await agent
        .del(responsePost.body.url)
        .auth('token', process.env.ACCESS_TOKEN)
        .set('User-Agent', 'agent');

      try {
        responseResourceGetrepeated = await httpUtils.authGetSync(responsePost.body.url);
      } catch (err) {
        responseResourceGetrepeated = err.response;
      }
    });

    it('then the response should contain status=204 and body must be empty', () => {
      expect(responseDelete.status).toBe(statusCode.NO_CONTENT);
    });

    it('and the resource must not exists', () => {
      expect(responseResourceGetrepeated.status).toBe(statusCode.NOT_FOUND);
      expect(responseResourceGetrepeated.body.message).toBe('Not Found');
    });
  });
});
