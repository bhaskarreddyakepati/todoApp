

myapp.factory('commonFactory', function ($http,$q) {
    console.log("In Common factory");
    return {
        getCountriesList: function() {
            return $http({
                method: "GET",
                url: "https://services.kiofc.com/api/51/api/callcenter/lists/countries",
            }).then(function(response) {
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
        },
        getStatesList: function(countryCode) {
            return $http({
                method: "GET",
                url: "https://services.kiofc.com/api/51/api/callcenter/lists/states/"+countryCode+"",
            }).then(function(response) {
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
        },
        getAddressTypeList: function() {
            return $http({
                method: "GET",
                url: "https://services.kiofc.com/api/51/api/callcenter/lists/addresstypes",
            }).then(function(response) {
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