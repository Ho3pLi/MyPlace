const crypto = require('crypto');

export default async (event, context) => {

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Some error occurred. Check the env file for the understanding the error code. Error code: aicokj' }),
    };
  }

  const { challengeCode } = event.challenge_code;

  if (!challengeCode) {
    return new Response(JSON.stringify({ message: 'Some error occurred. Check the env file for the understanding the error code. Error code: awdubo' }));
  }

  const verificationCode = Netlify.env.get('verificationCode');
  const endpoint = Netlify.env.get('endpoint');
  const hash = crypto.createHash('sha256');
  hash.update(challengeCode);
  hash.update(verificationCode);
  hash.update(endpoint);
  const responseHash = hash.digest('hex');

  return new Response(JSON.stringify({challengeResponse: responseHash}));
};

export const config = {
    path: "/api/eadcnwapi"
};