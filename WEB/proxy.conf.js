const PROXY_CONFIG = [{
    context: [
      "/api/**"
    ],
    target: "http://localhost:3000", //temporary, will need to be changed here and in the backend config later so it can be accessed outside a local machine
    secure: false,
    "logLevel": "debug"
  }];module.exports = PROXY_CONFIG;