/* global provider */

const { matchers } = require('jest-json-schema');

const agent = require('superagent');
const { listPublicEventsSchema } = require('../schema/list-public-events-schema');

const { listPublicEventsExp } = require('../schema/list-public-events-exp');


expect.extend(matchers);


const urlBase = 'https://api.github.com';
const urlEvents = `${urlBase}/events`;

describe('Given event Github API resources', () => {
  describe('When wanna verify the List public events', () => {
    let EXPECTED_BODY;
    const schema = listPublicEventsSchema;

    beforeEach(async () => {
      EXPECTED_BODY = await agent
        .get(urlEvents)
        .set('User-Agent', 'agent')
        .auth('token', process.env.ACCESS_TOKEN);
      EXPECTED_BODY.body = listPublicEventsExp;
    });


    it('then the body should have fulfill the pact', async (done) => {
      for (let i = 0; i < EXPECTED_BODY.body.length; i += 1) {
        expect(EXPECTED_BODY.body[0]).toMatchSchema(schema);
      }
      done();
    });
  });
});
