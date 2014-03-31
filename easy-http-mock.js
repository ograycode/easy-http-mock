
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
        var method = keys[i].method;
        var url = keys[i].url;
        var response = keys[i].data;
        var status = keys[i].status;
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
          easyHttpMock.intercept(data, false);
          return data || $q.when(data);
        },
        responseError: function(data) {
          easyHttpMock.intercept(data, true);
          return $q.reject(data);
        }
      };
    });
  }]);
