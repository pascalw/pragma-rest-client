var agent = require('superagent-promise')(require('superagent'), Promise);

class RequestExecutor {
  execute(request) {
    var method = request.method;
    var url = request.url;

    return agent(method, url);
  }
}

export default RequestExecutor;
