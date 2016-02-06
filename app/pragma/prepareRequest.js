import { Request } from './RequestExecutor';
import { transform } from 'lodash/object';

export default function prepareRequest(method, url, headers, body, environment) {
  url = resolveVariables(url, environment);
  body = body ? resolveVariables(body, environment) : body;

  headers = transform(headers, (result, _, key) => {
    result[key] = resolveVariables(headers[key], environment);
  });

  return new Request(method, url, headers, body);
}

/**
 * Variables are expected in format ${variableName}.
 */
function resolveVariables(into:string, environment) {
  return into.replace(/\${(.*?)}/g, (_, variableName) => {
    const value = environment && environment.variables.get(variableName);

    if (value == null)
      throw new Error(`Undeclared variable '${variableName}' used`);

    return value;
  });
}
