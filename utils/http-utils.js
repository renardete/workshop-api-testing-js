const agent = require('superagent-promise')(require('superagent'), Promise);
<<<<<<< HEAD
const responseTime = require('superagent-response-time');
=======
const agentResponseTime = require('superagent-response-time');
const statusCode = require('http-status-codes');

>>>>>>> master

module.exports = {
  authGetSync: async (url) => {
    const response = await agent
      .get(url)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');
    return response;
  },
  authHeadSync: async (url) => {
    const response = await agent
      .head(url)
      .redirects(0)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .ok(res => {
        if (res.status === statusCode.MOVED_PERMANENTLY)
          return res;
      });
    return response;
  },
<<<<<<< HEAD
  authGetResponseTimeSync: async function authResponseTimeSync(url) {
    let ResponseTime = Number.MAX_SAFE_INTEGER;
=======
  authGetResponseTimeSync: async (url) => {
    let responseTime = undefined;
>>>>>>> master
    await agent
      .get(url)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
<<<<<<< HEAD
      .use(responseTime( async (req, time) => {
        ResponseTime = time;
      }));

    return ResponseTime;

=======
      .use(agentResponseTime((req, time) => {
        responseTime = time;
      }));
    return responseTime;
>>>>>>> master
  }
}
