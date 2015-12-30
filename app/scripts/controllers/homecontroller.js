myapp.controller('HomeController',['$scope','$http','$mdSidenav','propertiesfactory',function($scope,$http,$mdSidenav,propertiesfactory){
    $scope.toggleList=function(){
        $mdSidenav('left').toggle();
    }
    $scope.languages=[{"Code":"en","Name":"English"},{"Code":"fr","Name":"French"}];
    $scope.language="en";
    $scope.properties={};

    $("a").click(function() {
        $("a").closest('.sidenavapp').removeClass('selected');
        $(this).closest('.sidenavapp').addClass('selected');
        $scope.toggleList();
    });

    propertiesfactory.getProperties("en")
        .then(function(data) {
            $scope.properties  = data;
            console.log("proeprties:"+ $scope.properties);
        }, function(error) {
            $scope.properties = error;
        });

    watchLanguageChange($scope,propertiesfactory);
    $scope.langChange=function(language){
        propertiesfactory.getProperties(language)
            .then(function(data) {
                $scope.properties  = data;
                console.log("proeprties:"+ $scope.properties);
            }, function(error) {
                $scope.properties = error;
            });
    }
}]);
