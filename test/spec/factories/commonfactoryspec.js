describe('commonFactory',function(){

    var $rootScope,$httpBackend,commonFactory;

    beforeEach( module("loginApp"));
    beforeEach(inject(function(_$rootScope_,_$httpBackend_,_commonFactory_) {

        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        commonFactory = _commonFactory_;
        $httpBackend
            .whenGET('https://services.kiofc.com/api/51/api/callcenter/lists/countries')
            .respond([{"Id": "1", "Code": "US", "Name": "United States"}])
    }));


        describe('getCountriesList',function(){
            var countriesList;
            it('Should return all countries list',function(){

                commonFactory.getCountriesList().then(function(result){
                    countriesList = result;
                });
                $rootScope.$digest();
                $httpBackend.flush();
                expect(countriesList.length).toBeDefined();
                expect(countriesList.length).toBe(1);
                expect(countriesList[0].Code).toEqual('US');

            });
            it('Should have the correct country name',function(){

                commonFactory.getCountriesList().then(function(result){
                    countriesList = result;
                });
                $rootScope.$digest();
                $httpBackend.flush();
                expect(countriesList.length).toBeDefined();
                expect(countriesList.length).toBe(1);
                expect(countriesList[0].Name).toEqual('United States');

            });
        });
});