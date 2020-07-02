'use strict';
var app = angular.module('testApp', ['sd.canvas-area-draw']);
app.controller("myCtrl", function($scope) {
    $scope.points = [[]];
    $scope.enabled = true;
    $scope.colorArray = ['#FF0000', '#FFFF00', '#0000FF', '#008000', '#C0C0C0'];
    $scope.activePolygon = 0;

    $scope.undo = function(){
        $scope.points[$scope.activePolygon].splice(-1, 1);
        alert("MERGE!");
    };

    $scope.clearAll = function(){
        $scope.points[$scope.activePolygon] = [];
    };

    $scope.removePolygon = function (index) {
        $scope.points.splice(index, 1);
        if(index <= $scope.activePolygon) {
            --$scope.activePolygon;
        }
        if($scope.points.length == 0) {
        	$scope.enabled = false;
        }
    };

    $scope.add = function add() {
    	$scope.enabled = true;
    	$scope.points.push([]);
        $scope.activePolygon = $scope.points.length - 1;
        alert("MERGE!");
    }
});

