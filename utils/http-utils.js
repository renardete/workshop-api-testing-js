const agent = require('superagent-promise')(require('superagent'), Promise);
const agentResponseTime = require('superagent-response-time');
const statusCode = require('http-status-codes');

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
  authGetResponseTimeSync: async (url) => {
    let responseTime = undefined;
    await agent
      .get(url)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .use(agentResponseTime((req, time) => {
        responseTime = time;
      }));
    return responseTime;
  }
}
