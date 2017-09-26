angular.module('demo', [])
.controller('Hello', function($scope, $http) {
    $http.get('https://cex.io/api/last_price/BTC/USD').
        then(function(response) {
            $scope.price = response.data;
        });
});
