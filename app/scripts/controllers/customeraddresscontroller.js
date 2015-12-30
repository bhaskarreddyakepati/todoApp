
myapp.controller('CustomerAddressController',['$scope','$http','commonFactory', function($scope,$http,commonFactory) {


    console.log($scope.countries);

    $scope.countries = [{}];
    $scope.states = [{}];
    $scope.addressTypes = [{}];
    $scope.countryid ="";

    commonFactory.getCountriesList()
        .then(function(data) {
            $scope.countries = data;
            console.log($scope.countries);
        }, function(error) {
            alert("Error while returning countries response:"+error.Message );
        });
    commonFactory.getAddressTypeList()
        .then(function(data) {
            $scope.addressTypes = data;
            console.log($scope.addressTypes);
        }, function(error) {
            alert("Error while returning countries response:"+error.Message );
        });


    $scope.countryChange=function(){
        console.log("countrycode: "+$scope.country);
        var country = $scope.country;
        $scope.countryid =country.substr(0,country.indexOf("|"));
        $scope.countrycode = country.substr(country.indexOf("|")+1,country.length);
        console.log("countrycode: "+$scope.countryid +"  code:"+$scope.countrycode);
        commonFactory.getStatesList($scope.countrycode)
            .then(function(data) {
                $scope.states = data;
                console.log($scope.states);
            }, function(error) {
                alert("Error while returning countries response:"+error.Message );
            });
    }


    $scope.createCustomerAddress=function(methodname) {
        console.log("customer id:"+$scope.customerid+" Phone1:"+$scope.phone1+ " Phone2:"+$scope.phone2+" State Id:"+$scope.stateid);
        console.log("authkey:" + sessionStorage.getItem("authKey"));
        $scope.Id = 0;
        if($scope.phone1) {
            $scope.phoneNumber1 = "(" + $scope.phone1.substr(0, 3) + ") " + $scope.phone1.substr(3, 3) + "-" + $scope.phone1.substr(6, 4);
        };
        if($scope.phone2) {
            $scope.phoneNumber2 = "(" + $scope.phone2.substr(0, 3) + ") " + $scope.phone2.substr(3, 3) + "-" + $scope.phone2.substr(6, 4);
        };
        $scope.url="https://services.kiofc.com/api/51/api/callcenter/customers/"+$scope.customerid+"/addresses";
        $scope.methodName="POST";
        $scope.paramData={
            "Address": {
                "Id": $scope.Id,
                "Address1": ""+$scope.address1+"",
                "Address2": ""+$scope.address2+"",
                "Address3": ""+$scope.address3+"",
                "PostalCode": ""+$scope.postalcode+"",
                "CustomerId": $scope.customerid,
                "City": ""+$scope.city+"",
                "Phone1": ""+$scope.phoneNumber1+"",
                "Phone2": ""+$scope.phoneNumber2+"",
                "Name": ""+$scope.name+"",
                "Instructions": null,
                "IsDeleted": false,
                "State": {
                    "Id": $scope.stateid,
                    "Code": "",
                    "Name": "",
                },
                "Country": {
                    "Id": $scope.countryid,
                    "Code": "",
                    "Name": ""
                },
                "AddressType": {
                    "Id": $scope.addresstypeid,
                    "Name": "",
                }
            }
        };
        if (methodname=='update') {
            console.log("update");
            $scope.Id = $scope.addressid;
            $scope.url="https://services.kiofc.com/api/51/api/callcenter/customers/"+$scope.customerid+"/addresses/"+$scope.Id+"";
            $scope.methodName="PUT";
            $scope.paramData={
                "Address": {
                    "Id": $scope.Id,
                    "Address1": ""+$scope.address1+"",
                    "Address2": ""+$scope.address2+"",
                    "Address3": ""+$scope.address3+"",
                    "PostalCode": ""+$scope.postalcode+"",
                    "CustomerId": $scope.customerid,
                    "City": ""+$scope.city+"",
                    "Phone1": ""+$scope.phoneNumber1+"",
                    "Phone2": ""+$scope.phoneNumber2+"",
                    "Name": ""+$scope.name+"",
                    "Instructions": null,
                    "IsDeleted": false,
                    "State": {
                        "Id": $scope.stateid,
                        "Code": ""+$scope.statecode+"",
                        "Name": ""+$scope.statename+"",
                    },
                    "Country": {
                        "Id": $scope.countryid,
                        "Code": ""+$scope.countrycode+"",
                        "Name": ""+$scope.countryname+""
                    },
                    "AddressType": {
                        "Id": $scope.addresstypeid,
                        "Name": ""+$scope.addresstypename+"",
                    }
                }
            };
        }else if (methodname=='delete') {
            $scope.Id = $scope.addressid;
            $scope.url="https://services.kiofc.com/api/51/api/callcenter/customers/"+$scope.customerid+"/addresses/"+$scope.Id+"";
            $scope.methodName="DELETE";
            $scope.paramData={};
        }

        console.log("ID:"+$scope.Id+" phone after:"+ $scope.phoneNumber+" Method Name:"+ $scope.methodName);
        $scope.authKey = sessionStorage.getItem("authKey");
        if ($scope.authKey == null) {
            $scope.loginResponse = {"Message": "Could not validate user. Please login."};
        } else {
            $scope.loginResponse = [{}];
            $http({
                method: ""+ $scope.methodName+"",
                headers: {
                    'authToken': $scope.authKey
                },
                data:$scope.paramData,
                url: ""+ $scope.url+"",
            }).then(function (resp) {
                console.log(resp.data);
                $scope.loginResponse = resp.data;
            }, function errorCallback(resp) {
                $scope.loginResponse = resp.data;
            });
        }
    }
}]);