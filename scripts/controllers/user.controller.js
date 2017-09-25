'use strict';
classMaker
    .controller("LoginController", function($scope, $rootScope, $state, loadDB) {
        'ngInject';
        $scope.loadDB = loadDB;
        $scope.login = {
            "mail": "",
            "pass": "",
            "remember": false
        };
        $scope.loginUser = function() {
            // if(valid === true){
            console.log("in");
            console.log($scope.login);
            $state.transitionTo('app.user');
        }
    })

    .controller("UserController", function($scope, userSvc, $rootScope) {
        'ngInject';
        var users = [
            "Students",
            "Teachers",
            "Admin"
        ];
        $scope.users = users;
        $scope.invalidGenderSelection = false;
        $rootScope.isNotFirstView = false;

    })

    .controller("StudentController", function($scope, userSvc, $rootScope) {
        'ngInject';
        $rootScope.isNotFirstView = true;
        $scope.student = {};
        // var student = [];
        $scope.addStudent = function() {
            if ($scope.student.gender) {
                $scope.student.usertype = "student";
                $scope.invalidGenderSelection = false;
                $scope.createStudent.$setPristine();
                // student.push($scope.student);
                userSvc.addUser($scope.student);
                $scope.student = {};
                // console.log(student);
            } else {
                $scope.invalidGenderSelection = true;
            }
        };

    })
    .controller("TeacherController", function($scope, userSvc) {
        'ngInject';
        $scope.isNotFirstView = true;
        $scope.teacher = {};
        // var teacher = [];
        $scope.addTeacher = function() {
            if ($scope.teacher.gender) {
                $scope.teacher.usertype = "teacher";
                $scope.invalidGenderSelection = false;
                $scope.createTeacher.$setPristine();
                // teacher.push($scope.teacher);
                userSvc.addUser($scope.teacher);
                $scope.teacher = {};
                // console.log(teacher);
            } else {
                $scope.invalidGenderSelection = true;
            }
        };

    })
    .controller("AdminController", function($scope, userSvc, $rootScope) {
        'ngInject';
        $rootScope.isNotFirstView = true;;
        $scope.admin = {};
        // var admin = [];
        $scope.addAdmin = function() {
            $scope.admin.usertype = "admin";
            $scope.createAdmin.$setPristine();
            // admin.push($scope.admin);
            userSvc.addUser($scope.admin);
            $scope.admin = {};
            // console.log(admin);
        };

    })

;
