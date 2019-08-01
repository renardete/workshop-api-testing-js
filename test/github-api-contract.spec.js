const agent = require('superagent');
const listPublicEventsSchema = require('../schema/list-public-events-schema');
const { Pact } = require("@pact-foundation/pact")
const { Matchers } = require("@pact-foundation/pact")
const urlBase = 'https://api.github.com';

describe('Given event Github API resources', () => {
  describe('When wanna verify the List public events', () => {
    let EXPECTED_BODY;

    beforeAll(async () => {
      EXPECTED_BODY = await agent
        .get(`${urlBase}/events`)
        .set('User-Agent', 'agent')
        .auth('token', process.env.ACCESS_TOKEN);

      const interaction = {
        state: "i have a list of projects",
        uponReceiving: "a request for projects",
        withRequest: {
          method: "GET",
          path: "/dogs",
          headers: {
            Accept: "application/json",
          },
        },
        willRespondWith: {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
          body: Matchers.like(EXPECTED_BODY.body),
        },
      }
      return provider.addInteraction(interaction)
    });



    it('then the body should have a schema', done => {
      return getMeDogs({
        url,
        port,
      })
        .then(response => {
          expect(response.headers["content-type"]).toEqual("application/json")
          expect(response.data).toEqual(EXPECTED_BODY)
          expect(response.status).toEqual(200)
          done()
        })
        .then(() => provider.verify())
    });
  });
});
