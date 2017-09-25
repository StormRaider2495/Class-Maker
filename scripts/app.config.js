'use strict';
classMaker
    .config(['$stateProvider', '$urlRouterProvider',

        function config($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');

            $stateProvider
                // state route for home page
                .state('app', {
                    url: '/',
                    views: {
                        'content': {
                            templateUrl: 'partials/login.html',
                            controller: 'LoginController'
                        }
                    },
                    resolve : {
                      loadDB : function(userSvc){
                        return userSvc.loadDB()
                      }
                    }
                })
                .state('app.user', {
                    url: '/user',
                    views: {
                        'header': {
                            templateUrl: 'partials/header.html'
                        },
                        'content@': {
                            templateUrl: 'partials/user.html',
                            controller: 'UserController'
                        }
                    }
                })
                .state('app.user.student', {
                    views: {
                        'student': {
                            templateUrl: 'partials/create_student.html',
                            controller: 'StudentController'
                        }
                    }
                })
                .state('app.user.teacher', {
                    views: {
                        'teacher': {
                            templateUrl: 'partials/create_teacher.html',
                            controller: 'TeacherController'
                        }
                    }
                })
                .state('app.user.admin', {
                    views: {
                        'admin': {
                            templateUrl: 'partials/create_admin.html',
                            controller: 'AdminController'
                        }
                    }
                })
        }
    ]);
