const agent = require('superagent-promise')(require('superagent'), Promise);

module.exports = {
  authGetSync: async function authGetSync(url) {
    const response = await agent
      .get(url)
      .auth('token', process.env.ACCESS_TOKEN)
      .set('User-Agent', 'agent');
    return response;
  }
}


