(function(){
    var app = angular.module('app',['ngRoute'])

    app.config(function($routeProvider) {
        $routeProvider
        .when('/content/posts/{postId}', {
            templateUrl : '/templates/post.html',
            controller : 'postController'
        })
        .when('/content/posts', {
            templateUrl : 'templates/list.html',
            controller : 'listController'
        })
    });

    app.controller('rootController', function($scope){
        var vm = this;
        var active = null;
    });

    app.controller('sideBarController', function($scope, $http){
        var vm = this;
        var parent = $scope.$parent.vm;

        $http.get('/api/sidebar/options')
        .then(function(response){
            vm.options = response.data['options']
        });
        
        parent.active = vm.options[0];
    });

    app.controller('contentController', function($scope) {
        var vm = this;
        var parent = $scope.$parent.vm;
        
        vm.content = null;

        $scope.$watch(parent.active, function(active, $location){
            $http.get('/api/content/' + active)
            .then(function(response){
                vm.content = response.data['content'];
                $location.path() = '/content/' + active;  
            })
        });
    });

    app.controller('postController', function($scope) {
        var vm = this;
        var parent = $scope.$parent.vm;
    });

    app.controller('listController', function($scope) {
        var vm = this;
        var parent = $scope.$parent.vm;

        vm.content = parent.content;
    });
}());