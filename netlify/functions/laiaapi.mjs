import puppeteer from 'puppeteer';

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
    const challengeCode = url.searchParams.get('type');
    console.log('type: ',challengeCode);  

    // if (!challengeCode) {
    //   return new Response(JSON.stringify({ message: 'Some error occurred. Check the env file for the understanding the error code. Error code: awdubo' }));
    // }

    const logurl = Netlify.env.get('logurl');
    const usr = Netlify.env.get('usr');
    const psw = Netlify.env.get('psw');
    const usrfldid = Netlify.env.get('usrfldid');
    const pswfldid = Netlify.env.get('pswfldid');
    const btnaglid = Netlify.env.get('btnaglid');
    const btnaglid2 = Netlify.env.get('btnaglid2');
    const hamplid = Netlify.env.get('hamplid');
    const hampl = Netlify.env.get('hampl');
    const btnslvid = Netlify.env.get('btnslvid');

    let browser;

    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(logurl);
    console.log(`Navigated to URL: ${url}`);

    await page.type(`#${usrfldid}`, usr);
    await page.type(`#${pswfldid}`, psw);
    await page.keyboard.press('Enter');
    console.log('Credentials entered.');

    await page.waitForNavigation();

    const content = await page.$eval(contentSelector, (el) => el.textContent.trim());
    console.log('Contenuto estratto:', content);

    return new Response(JSON.stringify({test:content}), {headers: {'Content-Type': 'application/json'}});
    // const verificationCode = Netlify.env.get('verificationCode');
    // console.log('verification code: ',verificationCode);
    // const endpoint = Netlify.env.get('endpoint');
    // console.log('endpoint: ',endpoint);
    // const hash = crypto.createHash('sha256');
    // console.log('hash: ',hash);
    // hash.update(challengeCode);
    // hash.update(verificationCode);
    // hash.update(endpoint);
    // console.log('HASH UPDATE DONE');

    // const responseHash = hash.digest('hex');
    // console.log('response hash: ',responseHash);  
    // console.log('END');

    // if (responseHash.charCodeAt(0) === 0xFEFF) {
    //   responseHash.slice(1);
    // }

    // return new Response(JSON.stringify({challengeResponse: responseHash}), {headers: {'Content-Type': 'application/json'}});
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