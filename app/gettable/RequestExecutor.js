import { Map } from 'immutable';
const request = require('request');

class Response {
  body:?string;
  headers:Map;
  status:number;
  statusText:string;
  responseTimeMs:number;

  constructor(body:string, headers:Object, status:number, statusText:string, responseTimeMs:number) {
    this.body = body;
    this.headers = new Map(headers);
    this.status = status;
    this.statusText = statusText;
    this.responseTimeMs = responseTimeMs;
  }
}

export default function execute(method:string, url:string, headers:Object, body:?string) {
  const requestStart = performance.now();

  return new Promise((resolve, reject) => {
    request({method, url, headers, body}, (error, response) => {
      if (error) return reject(error);

      const requestEnd = performance.now();
      const responseTimeMs = Math.round(requestEnd - requestStart);

      resolve(new Response(response.body, response.headers, response.statusCode, response.statusMessage, responseTimeMs));
    });
  });
};
