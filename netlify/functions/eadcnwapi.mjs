const crypto = require('crypto');

export default async (req, context) => {
  try {
    console.log('START');
    console.log('req method: ',req.method);
    
    if (req.method !== 'GET') {
      return new Response(JSON.stringify({ message: 'Some error occurred. Check the env file for the understanding the error code. Error code: aicokj' }));
    }
    const reqUrl = req.url;
    console.log('req url: ',reqUrl);
    const url = new URL(reqUrl);
    console.log('URL: ',url);
    const challengeCode = url.searchParams.get('challenge_code');
    console.log('challenge code: ',challengeCode);  

    if (!challengeCode) {
      return new Response(JSON.stringify({ message: 'Some error occurred. Check the env file for the understanding the error code. Error code: awdubo' }));
    }

    const verificationCode = Netlify.env.get('verificationCode');
    console.log('verification code: ',verificationCode);
    const endpoint = Netlify.env.get('endpoint');
    console.log('endpoint: ',endpoint);
    const hash = crypto.createHash('sha256');
    console.log('hash: ',hash);
    hash.update(challengeCode);
    hash.update(verificationCode);
    hash.update(endpoint);
    console.log('HASH UPDATE DONE');

    const responseHash = hash.digest('hex');
    console.log('response hash: ',responseHash);  
    console.log('END');

    return new Response(JSON.stringify({challengeResponse: responseHash}), {headers: {'Content-Type': 'application/json'}});
  } catch (error) {
    console.log({ error });
    return {
      statusCode: 500,
      message: error
    }
  }
};

// export const config = {
//     path: "/api/eadcnwapi"
// };