var easyHttpMock = {
  isEnabled: false,
  data: { 
    success: {},
    error: {}
  },
  intercept: function(response, isError) {
    var val = {
      data: response.data,
      url: response.config.url,
      method: response.config.method,
      raw: response,
      status: response.status
    };
    var key = response.config.url;
    easyHttpMock.log(key, val, isError);
  },
  log: function(key, val, isError) {
    if (isError) {
      easyHttpMock.data.error[key] = val;
    } else {
      easyHttpMock.data.success[key] = val;
    }
  },
  createBackend: function($httpBackend, data) {
    var create = function (d, keys) {
      for(var i = 0; i < keys.length; i++) {
        var method = d[keys[i]].method;
        var url = d[keys[i]].url;
        var response = d[keys[i]].data;
        var status = d[keys[i]].status;
        $httpBackend.when(method, url).respond(status, response);
      }
    };
    if (data.success) {
      create(data.success, Object.keys(data.success));
    }
    if (data.error) {
      create(data.error, Object.keys(data.error));
    }
  }
};

angular.module('easyHttpMock', []).
  config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push(function($q){
      return {
        response: function(data) {
          if (easyHttpMock.isEnabled) {
            easyHttpMock.intercept(data, false);
          }
          return data || $q.when(data);
        },
        responseError: function(data) {
          if (easyHttpMock.isEnabled) {
            easyHttpMock.intercept(data, true);
          }
          return $q.reject(data);
        }
      };
    });
  }]);
