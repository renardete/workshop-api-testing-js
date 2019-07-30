const agent = require('superagent-promise')(require('superagent'), Promise);

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
    console.log(response.status)
    return response;
  }
}


