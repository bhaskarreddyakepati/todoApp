
myapp.factory('propertiesfactory', function($http) {

    var properties={};
    return {
        getProperties: function (language) {
            if (language!="no") {
                return $http({
                    method: "GET",
                    url: "../resources/tillster-" + language + ".properties",
                }).then(function (response) {
                    if (typeof response.data === 'object') {
                        properties = response.data;
                        return properties;
                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }

                }, function (response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
            } else {
                return properties;
            }
        }
    }
});
