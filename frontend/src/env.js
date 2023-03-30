const env = process.env.USER_AUTHENTICATION_APP_ENV;

let envApiUrl = '';

if (env === 'product') {
  envApiUrl = `https://${process.env.REACTJS_USERAUTHENTICATIONAPP_DOMAIN_PROD}`;
}else if(env === 'staging') {
  envApiUrl = `https://${process.env.REACTJS.env.REACTJS_USERAUTHENTICATON_DOMAIN_STAG}`;
}else {
  envApiUrl = `https://${process.env.REACTJS_APP_DOMAIN_DEV}`;
}

export const apiUrl = envApiUrl;
export const appName = process.env.REACTJS_APP_NAME;
