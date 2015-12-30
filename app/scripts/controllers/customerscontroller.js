
myapp.controller('CustomersController',['$scope','$http', function($scope,$http) {

    $scope.createCustomer=function(methodname) {
        console.log("customer id:"+$scope.customerid+" Phone:"+$scope.phone);
        console.log("authkey:" + sessionStorage.getItem("authKey"));
        $scope.Id = 0;
        if($scope.phone) {
            $scope.phoneNumber = "(" + $scope.phone.substr(0, 3) + ") " + $scope.phone.substr(3, 3) + "-" + $scope.phone.substr(6, 4);
        };
        $scope.url="https://services.kiofc.com/api/51/api/callcenter/customers";
        $scope.methodName="POST";
        $scope.paramData={
            "Customer": {
                "Addresses": [],
                "Id": $scope.Id,
                "FirstName": "" + $scope.firstName + "",
                "LastName": "" + $scope.lastName + "",
                "Phone": "" +  $scope.phoneNumber + "",
                "Email": "" + $scope.customeremail + "",
                "Notes": "",
                "IsDeleted": false
            }
        };
        if (methodname=='update') {
            console.log("update");
            $scope.Id = $scope.customerid;
            $scope.url="https://services.kiofc.com/api/51/api/callcenter/customers/"+$scope.Id+"";
            $scope.methodName="PUT";
            $scope.paramData={
                "Customer": {
                    "Addresses": [],
                    "Id": $scope.Id,
                    "FirstName": "" + $scope.firstName + "",
                    "LastName": "" + $scope.lastName + "",
                    "Phone": "" +  $scope.phoneNumber + "",
                    "Email": "" + $scope.customeremail + "",
                    "Notes": "",
                    "IsDeleted": false
                }
            };
        }else if (methodname=='delete') {
            $scope.Id = $scope.customerid;
            $scope.url="https://services.kiofc.com/api/51/api/callcenter/customers/"+$scope.Id+"";
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
