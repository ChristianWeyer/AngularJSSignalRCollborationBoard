app.factory('collabPushService', ['hubProxy', function(hubProxy) {
    var proxy = hubProxy(hubProxy.defaultServer, 'collabHub');
    proxy.start().done(function () {
    });
    
    return proxy;
}]);