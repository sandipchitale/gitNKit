(function() {
    var path = require('path');
    var fileSystem = require('fs');
    var childProcess = require('child_process');
    var pathExtra = require('path-extra');
    var gui = require('nw.gui');
    var openThis = require('open');
    var process = require('process');

    angular.module("gitNkitApp", ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('gitNkit', {
            url : '/',
            templateUrl : 'templates/dashboard.html',
            controller: 'DashboardController'
        }).state('dashboard', {
            url : '/dashboard',
            templateUrl : 'templates/dashboard.html',
            controller: 'DashboardController'
        }).state('repository', {
            url : '/repository/:mode/:index',
            templateUrl : 'templates/repository.html',
            controller: 'RepositoryController'
        });
    })
    .run(function($rootScope, $window, $location) {
        // listen change start events
        $rootScope.$on('$stateChangeSuccess', function() {
        });
        $rootScope.openThis = function(fileOrUrl) {
            openThis(fileOrUrl);
            return false;
        }
        $rootScope.openThisRelativeToHomeDir = function(relativePathToFile) {
            return $rootScope.openThis(pathExtra.homedir() + '/' + relativePathToFile);
        }
    }).controller('gitNkitController', function($scope, $location) {

        $scope.atDashboard = function() {
            return ($location.path() === '/' || $location.path() === '/dashBoard');
        }

        $scope.atRepository = function() {
            return ($location.path() === '/repository');
        }

        // common
        $scope.debug = function() {
            gui.Window.get().showDevTools();
        }
        $scope.exit = function() {
            gui.Window.get().close();
            return false;
        }

        $scope.repositorySources = {
            local: {
                repositories: [
                    {label: 'sandipchitale/FireJSOD', path: ''},
                    {label: 'sandipchitale/POM360', path: ''}
                ]
            },
            github: {
                repositories: [
                    {label: 'sandipchitale/FireJSOD', url: ''},
                    {label: 'sandipchitale/POM360', url: ''}
                ]
            }
        };

        $scope.showRepositoriesFromSource = function(from) {
            if ($scope.repositorySources.hasOwnProperty(from)) {
                $scope.mode = from;
            }
        }
        $scope.showRepositoriesFromSource('local');
    }).controller('DashboardController', function($scope, $location, $stateParams, $state) {
        $scope.showRepository = function(index) {
            $location.path('/repository');
        };
    }).controller('RepositoryController', function($scope, $location, $stateParams, $state) {
        $scope.showDashboard = function() {
            $location.path('/dashboard');
        };
    });
})();