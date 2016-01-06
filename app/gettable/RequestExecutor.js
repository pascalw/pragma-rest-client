import { Map } from 'immutable';
const httpClient = {request: require('request')};

class Response {
  body:?string;
  headers:Map;
  status:number;
  statusText:string;
  responseTimeMs:number;

  constructor(body, headers, status, statusText, responseTimeMs) {
    this.body = body;
    this.headers = new Map(headers);
    this.status = status;
    this.statusText = statusText;
    this.responseTimeMs = responseTimeMs;
  }
}

export class Request {
  method:string;
  url:string;
  headers:Object;
  body:?string;

  constructor(method, url, headers, body) {
    this.method = method;
    this.url = url;
    this.headers = headers;
    this.body = body;
  }
}

export function execute(request:Request) {
  const requestStart = performance.now();

  return new Promise((resolve, reject) => {
    httpClient.request({
      method: request.method,
      url: request.url,
      headers: request.headers,
      body: request.body
    }, (error, response) => {
      if (error) return reject(error);

      const requestEnd = performance.now();
      const responseTimeMs = Math.round(requestEnd - requestStart);

      resolve(new Response(response.body, response.headers, response.statusCode, response.statusMessage, responseTimeMs));
    });
  });
};
