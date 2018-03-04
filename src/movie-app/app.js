(function() {
    'use strict';

    angular.module('movieApp', [
            'ui.bootstrap',
            'ngRoute',
            'movieCore',
            'omdb',
            'ngMockE2E',
            'ngResource'
        ]).config(routeConfiguration)
        .config(configLogProvider)
        .run(runPopularMovies);

    function routeConfiguration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'movie-app/home.html',
                controller: 'HomeController'
            })
            .when('/results', {
                templateUrl: 'movie-app/results.html',
                controller: 'ResultsController'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

    function configLogProvider($logProvider) {
        $logProvider.debugEnabled(false);
    }

    function runPopularMovies($httpBackend) {
        var data = ['tt0076759', 'tt0080684', 'tt0086190'];
        var headers = {
            headers: { 'Content-Type': 'application/json' }
        };

        $httpBackend.whenGET(function(s) {
            return (s.indexOf('popular') !== -1);
        }).respond(200, data, headers);

        $httpBackend.whenGET(/.*/).passThrough();
    }
})();