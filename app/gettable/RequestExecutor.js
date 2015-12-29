var request = require('request');

class Response {
  body:?string;
  headers:Object;
  status:number;
  statusText:string;

  constructor(body:string, headers:Object, status:number, statusText:string) {
    this.body = body;
    this.headers = headers;
    this.status = status;
    this.statusText = statusText;
  }
}

export default function execute(method, url, headers, body) {
  return new Promise((resolve, reject) => {
    request({method, url, headers, body}, (error, response) => {
      if (error) return reject(error);
      resolve(new Response(response.body, response.headers, response.statusCode, response.statusMessage));
    });
  });
};
