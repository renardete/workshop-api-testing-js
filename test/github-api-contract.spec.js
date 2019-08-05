/* global provider */

const { matchers } = require('jest-json-schema');

const agent = require('superagent');
const { listPublicEventsSchema, publicActorSchema } = require('../schema/list-public-events-schema');

expect.extend(matchers);


const urlBase = 'https://api.github.com';
const urlEvents = `${urlBase}/events`;

describe('Given event Github API resources', () => {
  describe('When wanna verify the List public events', () => {
    let EXPECTED_BODY;
    const generalSchema = listPublicEventsSchema;
    const actorSchema = publicActorSchema;

    beforeAll(async () => {
      EXPECTED_BODY = await agent
        .get(urlEvents)
        .set('User-Agent', 'agent')
        .auth('token', process.env.ACCESS_TOKEN);
    });


    it('then the body should match the general schema', async (done) => {
      for (let i = 0; i < EXPECTED_BODY.body.length; i += 1) {
        expect(EXPECTED_BODY.body[i]).toMatchSchema(generalSchema);
      }
      done();
    });

    it('and the actor should match actor-schema', (done) => {
      for (let i = 0; i < EXPECTED_BODY.body.length; i += 1) {
        expect(EXPECTED_BODY.body[i].actor).toMatchSchema(actorSchema);
      }
      done();
    });
  });
});
