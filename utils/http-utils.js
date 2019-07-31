const agent = require('superagent-promise')(require('superagent'), Promise);
const responseTime = require('superagent-response-time');

module.exports = {
  authGetSync: async function authGetSync(url) {
    const response = await agent
      .get(url)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');
    return response;
  },
  authHeadSync: async function authHeadSync(url) {
    const response = await agent
      .head(url)
      .redirects(0)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .ok(res => {

        if (res.status === 301)        
        return res;
      });
    return response;
  },
  authGetResponseTimeSync: async function authResponseTimeSync(url) {
    let ResponseTime = Number.MAX_SAFE_INTEGER;
    await agent
      .get(url)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent')
      .use(responseTime( async (req, time) => {
        ResponseTime = time;
      }));
    return ResponseTime;
  }
}


