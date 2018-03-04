angular.module('omdb', []);
(function() {
    'use strict';

    angular
        .module('omdb')
        .factory('omdbApi', omdbApi);

    omdbApi.$inject = ['$http', '$q'];

    function omdbApi($http, $q) {

        var baseUrl = 'http://www.omdbapi.com/?v=1&';
        var apiKey = '1bc42a35';

        var service = {
            search: search,
            find: find
        };

        function httpPromise(url) {
            var deferred = $q.defer();
            $http.get(url)
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function(e) {
                    deferred.reject(e);
                });
            return deferred.promise;
        }

        function search(query) {
            return httpPromise(baseUrl + 's=' + encodeURIComponent(query) + '&apikey=' + apiKey);
        }

        function find(id) {
            return httpPromise(baseUrl + 'i=' + id + '&apikey=' + apiKey);
        }

        return service;
    }
})();