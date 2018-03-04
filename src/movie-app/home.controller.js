(function() {
    'use strict';

    angular
        .module('movieApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = [
        '$scope',
        '$interval',
        '$exceptionHandler',
        'omdbApi',
        'PopularMovies'
    ];

    function HomeController($scope,
        $interval,
        $exceptionHandler,
        omdbApi,
        PopularMovies) {

        var results = [];

        var findMovie = function(id) {
            omdbApi.find(id)
                .then(function(data) {
                    $scope.result = data;
                })
                .catch(function(e) {
                    $exceptionHandler(e);
                });
        };

        PopularMovies.query(function(data) {
            results = angular.copy(data);
            findMovie(results[0]);

            var idx = 0;
            $interval(function() {
                ++idx;
                findMovie(results[idx % results.length]);
            }, 5000);
        });
    }
})();