const crypto = require('crypto');

export default async (req, context) => {
  
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ message: 'Some error occurred. Check the env file for the understanding the error code. Error code: aicokj' }));
  }
  const reqUrl = req.url;
  const url = new URL(reqUrl);
  const challengeCode = url.searchParams.get('challenge_code');

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

  return new Response(JSON.stringify({challengeResponse: responseHash}), {headers: {'Content-Type': 'application/json'}});
};

export const config = {
    path: "/api/eadcnwapi"
};