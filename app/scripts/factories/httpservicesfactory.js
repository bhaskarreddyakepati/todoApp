
myapp.factory('httpServiceFactory', function ($http, $q) {
    return {
        getResult: function(methodName,authKey,url) {
            var baseUrl ="https://services.kiofc.com/api/51/api/callcenter/";
            return $http({
                method: ""+ methodName+"",
                headers: {
                    'authToken': authKey
                },
                url: ""+baseUrl+ url+"",
            })
                .then(function(response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function(response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        }
    };
});