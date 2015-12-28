var agent = require('superagent-promise')(require('superagent'), Promise);

export default function execute(method, url, headers, body) {
  let request = agent(method, url);

  request.headers !== {} && request.set(headers);
  body && request.send(body);

  return request;
};
