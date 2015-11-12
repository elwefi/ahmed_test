var app = angular.module("MyApp", []);

app.filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});

app.controller("PricingCtrl", function($scope, $http) {

  // All cities
  $scope.list_cities = function(){
    $scope.products = []; 
    url = window.location.href.split('/')[0];
    $http.get(url + "/cities/index").
      success(function(data, status, headers, config) {
        $scope.all_cities = data;
      }).
      error(function(data, status, headers, config) {

    });
  }

  // Reload data when change city
  $scope.change_city = function(select_city) {
    if ($scope.city_id !== select_city) {
      url = window.location.href.split('/')[0];

      $scope.city_id = select_city;
      $scope.cities = wihout_from_city(select_city);
      $scope.select_city = $scope.all_cities.filter(function(x){return x['id'] == select_city;})[0];
      $scope.currentPage = 0;
      // products
      $http.get(url + "/products/index?city=" + select_city).
        success(function(data, status, headers, config) {
          $scope.products =  data;
          // number tot of page
          $http.get(url + "/products/page_number?city=" + select_city).
            success(function(data, status, headers, config) {
              $scope.page_count = data;
            }).
            error(function(data, status, headers, config) {

          });
          // pricings
          $http.get(url + "/pricings/index?city=" + select_city + "&product_ids=" + product_ids()).
            success(function(data, status, headers, config) {
              $scope.pricings = data;
            }).
            error(function(data, status, headers, config) {

          });

        }).
        error(function(data, status, headers, config) {

      });


    }
  }
  // ids of products
  product_ids = function(){
    ids = [];
    for(var i=0; i<$scope.products.length; i++) {
      ids.push($scope.products[i]['id']);
    }
    return ids;
  }
  
  // Remove from city 
  wihout_from_city = function(id){
    cities = [];
    j = 0;
    for(var i=0; i<$scope.all_cities.length; i++) {
      if($scope.all_cities[i]['id'] != id) {
        cities[j] = $scope.all_cities[i];
        j++;
      }
    }
    return cities;
  }
  
  // Get color red if pricing < 0
  $scope.saving_color = function(val) {
    return val < 0 ? "danger" : ""
  }
  // range of number page
  $scope.range = function() {
    var rangeSize = 5;
    var ret = [];
    var start;
    start = $scope.currentPage;
    
    if ( start > $scope.page_count -rangeSize ) {
      start = $scope.page_count -rangeSize+1;
    }

    for (var i=start; i<start+rangeSize; i++) {
      ret.push(i);
    }

    for (var j=0; j<ret.length; j++) {

      if (ret[j] < 0) {
        ret.splice(j,1);
        j = j - 1 ;
      }
    }

    if (ret.length == 0) {
      ret.push(0);
    }

    return ret;
  };
  // get prev page
  $scope.prevPage = function() {
    
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
      $scope.setPage($scope.currentPage);
    }

  };
  // Disable prev
  $scope.prevPageDisabled = function() {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  // Get next page
  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.page_count) {
      $scope.currentPage++;
      $scope.setPage($scope.currentPage);
    }

  };
  // Disable next page
  $scope.nextPageDisabled = function() {
  return $scope.currentPage == $scope.page_count ? "disabled" : "";
  };
  // Get data of this page
  $scope.setPage = function(n) {
      url = window.location.href.split('/')[0];
      // proucts
      $http.get(url + "/products/index?city=" + $scope.city_id + "&page=" + (n+1)).
        success(function(data, status, headers, config) {
          $scope.products =  data;
          // pricings
          $http.get(url + "/pricings/index?city=" + $scope.city_id + "&product_ids=" + product_ids()).
            success(function(data, status, headers, config) {
              $scope.pricings = data;
            }).
            error(function(data, status, headers, config) {
          });

        }).
        error(function(data, status, headers, config) {

      });

      $scope.currentPage =  n;

  };


});