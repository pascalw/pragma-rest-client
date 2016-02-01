import { Map } from 'immutable';

export const HEADERS = [
  'Accept',
  'Accept-Charset',
  'Accept-Encoding',
  'Accept-Language',
  'Accept-Ranges',
  'Access-Control-Request-Headers',
  'Access-Control-Request-Method',
  'Authorization',
  'Content-Length',
  'Content-Type',
  'Cookie',
  'Date',
  'Expect',
  'From',
  'If-Match',
  'If-Modified-Since',
  'If-None-Match',
  'If-Range',
  'If-Unmodified-Since',
  'Origin',
  'Pragma',
  'Proxy-Authorization',
  'Range',
  'Referer',
  'Upgrade',
  'User-Agent',
  'Via'
];

export function getHeaderValue(headers:Map, requestedHeader:string) {
  const h = requestedHeader.toLowerCase();

  for (const header of headers.keys()) {
    if (header.toLowerCase() === h)
      return headers.get(header);
  }

  return null;
}

export function extractMimeType(headers:Map) {
  const contentType = getHeaderValue(headers, 'Content-Type');
  return contentType && contentType.split(';')[0];
}
