import { v4 as uuidv4 } from 'uuid';
import Cookies from 'cookies';

/*
const redirectToShopify = (req, res) => {
  // Generate a unique identifier for the visitor
  const visitorId = uuidv4();

  // Set a first-party cookie using the 'cookies' library
  const cookies = new Cookies(req, res);
  const cookieName = 'shopify_visitor_id_honeypot';
  const cookieOptions = {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  };
  cookies.set(cookieName, visitorId, cookieOptions);

  // Define the Shopify store URL to redirect the visitor to
  const shopifyStoreUrl = 'https://honeypotshopapp.myshopify.com/?_bt=eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaUpvYjI1bGVYQnZkSE5vYjNCaGNIQXViWGx6YUc5d2FXWjVMbU52YlFZNkJrVlUiLCJleHAiOiIyMDIzLTAzLTE2VDAzOjUzOjQyLjI4M1oiLCJwdXIiOiJwZXJtYW5lbnRfcGFzc3dvcmRfYnlwYXNzIn19--e7a1f11edde08b246932a5dfbb327af54cf86e8e';

  // Set the response status to 302 (temporary redirect)
  res.status(302);

  // Set the 'Location' header in the response to the Shopify store URL
  res.setHeader('Location', shopifyStoreUrl);

  // Send the response
  res.end(); 
};

export default redirectToShopify;



const redirectToShopify = (req, res) => {
  

  const shopifyDomain = 'honeypotshopapp.myshopify.com';
  const cookies = new Cookies(req, res);
  const cookieName = 'cookie_from_honeypot';
  const cookieValue = uuidv4();
  const isProduction = process.env.NODE_ENV === 'production';

  const cookieOptions = {
    domain: `.${shopifyDomain}`,
    path: '/',
    maxAge: 60 * 60 * 24 * 50 , // 30 days in seconds
    httpOnly: false,
    secure: isProduction,
    sameSite: 'lax',
  };

  
  console.log("cook set");
  cookies.set(cookieName, cookieValue, cookieOptions);
  res.redirect(`https://honeypotshopapp.myshopify.com/`);
};

export default redirectToShopify;

*/


const redirectToShopify = (req, res) => {
  // Generate a UUID
  const id = uuidv4();

  // Check if the request is secure or if the app is running on Vercel
  const isSecure = req.connection.encrypted || req.headers['x-forwarded-proto'] === 'https';
  console.log("isSecure is: ", isSecure);

  // Create a new instance of the Cookies class
  const cookies = new Cookies(req, res);

  // Set the cookie
  console.log("cook set");
  cookies.set('cookie_from_honeypot', id, {
    httpOnly: true,
    secure: isSecure,
    sameSite: 'none', // Change from 'strict' to 'none'
    domain: '.myshopify.com',
    expires: new Date(Date.now() + 86400000), // 1 day
  });

  // Redirect to the Shopify store
  console.log("now redirect");

  res.writeHead(307, {
    Location: 'https://honeypotshopapp.myshopify.com/',
  });
  res.end();
};

export default redirectToShopify;
 