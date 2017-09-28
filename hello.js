var mod = angular.module('demo', []);
mod.controller('Hello', function($scope, $http) {
    $http.get('https://cex.io/api/last_price/BTC/USD').
        then(function(response) {
            $scope.price = response.data;
            $scope.daz = 'asdasd';
        });
});

mod.controller('Test2', function test2($scope,$http){
    var nonce = (Math.round((new Date()).getTime() / 1000)).toString();
    console.log("NONCE : "+nonce);
    // sec2 = zxe9qAXhJGXfLNfyJtK4Ra6gOw
    // api_key2 = 39cGO1qlDF0ynrEL1q8UruZAhWg
    var api_key = 'gfizp3T1M4JDcbaHc0Lo7fplaQ';
    // Look at ways to hide this
    var sec = 'x4uN9CEaOW5FWoKigVQCy7eXs8';
    var userID = 'up105904596';


    var signa= nonce+userID+api_key;
    console.log("SIGNA : "+signa);
    var hash = sha256.hmac.create(sec).update(signa);
    console.log("HASH : "+hash);
    hash = hash.hex().toString().toUpperCase();
    console.log("COMPLETED HASH : "+hash);


    // Possible header issue. Generate key for daraghokeeffe.github.io (see CORS)
    var porv = JSON.stringify({ 'key' : api_key, 'signature' : hash, 'nonce' : nonce });
    //var porv = ['key': api_key,'signature':hash,'nonce':nonce];
   // var head = { headers : { 'Content-Type': 'application/x-www-form-urlencoded' }};
    var head = { headers: { 'Content-Type' : 'application/json; charset=utf-8' }};
   // $http.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    //$http.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
   

    $http.post('https://cex.io/api/balance/', porv, head).
        success(function(data, status) {
            // this callback will be called asynchronously
            // when the response is available
            console.log(data);
            $scope.auth = 'Yurt';
        }).
        error(function(data, status, headers, config) {
            $scope.auth = 'Failed';
            console.log(data);
             console.log("PORV"+porv);
            console.log('uiui : '+status);
          
        }).
        then(function(response) {
           $scope.auth = response.data;
        });
});



/*
    $scope.daz = "DEZX";
   var api_key = 'hOhqIVyWQysk6KpFMDRzPgnwgA';
    var sec = 'RC9NQ6tfXs2Uk36Ntj68jr3N4';
    var nonce = formatAMPM();
    var userID = 'up105904596';
    //params = {'key': api_key, 'signature' : signature, 'nonce': nonce,  }
    var message = nonce+userID+api_key;
    var data = $.param({
            'key' : api_key,
            'signature' : message,
            'nonce' : nonce
    }); */
    // $http.post('https://cex.io/api/balance', data).
    //    then(function(response) {
    //       $scope.auth = sec;
    //  });
  //  $scope.message = message;