
myapp.controller('RestaurantsController',['$scope','$http','httpServiceFactory', function($scope,$http,httpServiceFactory) {

    $scope.clickForAddress=false;
    $scope.customerIdValuestoDisplay="";
    $scope.submit=function(){
        console.log( $scope.callCenterId);
        console.log( $scope.dnis);
        console.log("authkey:"+sessionStorage.getItem("authKey"));
        $scope.authKey = sessionStorage.getItem("authKey");
        if($scope.authKey == null){
            $scope.loginResponse ={"Message":"Could not validate user. Please login."};
        }else {
            $scope.loginResponse = [{}];
            httpServiceFactory.getResult('GET',$scope.authKey,"" + $scope.callCenterId + "/restaurants/" + $scope.dnis + "")
                .then(function(data) {
                    $scope.loginResponse  = data;

                }, function(error) {
                    $scope.loginResponse = error;
                });
        }
    }
    $scope.clickForAddresses=function(customerId){

        console.log("cusotmerid:"+customerId);
        $scope.clickForAddress=true;
        $scope.customerIdValuestoDisplay=customerId;
    };

    $scope.customersByANI=function(){

        console.log( $scope.ani);
        console.log("authkey:"+sessionStorage.getItem("authKey"));
        $scope.authKey = sessionStorage.getItem("authKey");
        if($scope.authKey == null){
            $scope.loginResponse ={"Message":"Could not validate user. Please login."};
        }else {
            $scope.loginResponse = [{}];

            httpServiceFactory.getResult('GET',$scope.authKey,"customers/" + $scope.ani + "")
                .then(function(data) {
                    $scope.loginResponse = data;

                }, function(error) {
                    $scope.loginResponse = error;
                });
        }
    }
}]);
