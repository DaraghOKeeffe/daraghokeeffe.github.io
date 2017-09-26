angular.module('demo', [])
.controller('Hello', function($scope, $http) {
    $http.get('https://cex.io/api/last_price/BTC/USD').
        then(function(response) {
            $scope.price = response.data;
        });
});
angular.module('auth',[])
.controller('Auth', function($scope, $http){
    var api_key = 'hOhqIVyWQysk6KpFMDRzPgnwgA';
    var sec = 'RC9NQ6tfXs2Uk36Ntj68jr3N4';
    var nonce = formatAMPM();
    var userID = 'up105904596';
    //params = {'key': api_key, 'signature' : signature, 'nonce': nonce,  }
    var message = nonce+userID+api_key
    var data = $.param({
            'key' : api_key,
            'signature' : message,
            'nonce' : nonce
    });
    $http.post('https://cex.io/api/balance', data).
        then(function(response) {
            $scope.auth = sec;
        });
    
});



function formatAMPM() {
    var date = new Date();
    var hours = date.getHours();
    var days = date.getDay(); 
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = date + ' ' + hours + ':' + minutes + ' ' + ampm;
    return strTime;
}
