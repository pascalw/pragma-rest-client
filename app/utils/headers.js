import { Map } from 'immutable';

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
