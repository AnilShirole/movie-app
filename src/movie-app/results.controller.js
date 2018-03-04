(function() {
    'use strict';

    angular
        .module('movieApp')
        .controller('ResultsController', ResultsController);

    ResultsController.$inject = [
        '$scope',
        '$location',
        '$exceptionHandler',
        '$log',
        'omdbApi'
    ];

    function ResultsController($scope,
        $location,
        $exceptionHandler,
        $log,
        omdbApi) {

        var queryParams = $location.search();

        var query = queryParams && queryParams.q ? queryParams.q : null;

        $log.debug('Controller loaded with query: ', query);

        omdbApi.search(query)
            .then(function(data) {
                $log.debug('Data returned for query: ', query, data);
                $scope.results = data.Search;
            })
            .catch(function(e) {
                $exceptionHandler(e);
            });

        $scope.expand = function expand(index, id) {
            omdbApi.find(id)
                .then(function(data) {
                    $log.debug('Getting expanded movie data: ', index, id, data);
                    $scope.results[index].data = data;
                    $scope.results[index].open = true;
                });
        };
    }
})();