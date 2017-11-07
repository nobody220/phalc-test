app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
    function ($stateProvider, $urlRouterProvider, $httpProvider) {
        var landing 	= 	logId == '' ? '/auth' : '/';
    		var tpl 		= 	logId == '' ? '/index/auth' : '/index/home';
    		var newState 	= 	logId == '' ? '/login' : 'home';
    		var newTitle 	= 	logId == '' ? '/Login' : 'dashboard';
        
        $urlRouterProvider.otherwise(landing);
        $stateProvider
            .state(newState,{
                url:    landing,
                templateUrl: function(){ return baseUrl + tpl;},
                title: newTitle,
                resolve: {
                    loadPlugin: function ($ocLazyLoad, $rootScope, $state) {
                        if (logId != '') {
                            return $ocLazyLoad.load ([
                                {
                                    name: 'vendors',
                                    files: [
                                        baseUrl + '/js/controllers/home.js'
                                    ]
                                }
                            ])
                        }
                        else{
                            return $ocLazyLoad.load ([
                                {
                                    name: 'vendors',
                                    files: [
                                        baseUrl + '/js/controllers/login.js'
                                    ]
                                }
                            ])
                        }
                    }
                }
            })


            .state('home.activity',{
                url:    '/activity',
                templateUrl: '/index/activity',
                title: 'ActivityCtrl',                      // loaded na ung script kaya no need to include
                resolve: {
                    loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load ([
                                {
                                    name: 'vendors',
                                    files: [
                                        baseUrl + '/js/controllers/activity.js'
                                    ]
                                }
                            ])
                    }
                }
            })

            // .state('home.contact',{
            //     url:    '/contact',
            //     templateUrl: '/index/contact',
            //     title: 'contact',
            //     resolve: {
            //         loadPlugin: function ($ocLazyLoad) {
            //                 return $ocLazyLoad.load ([
            //                     {
            //                         name: 'vendors',
            //                         files: [
            //                             baseUrl + '/js/controllers/contact.js'
            //                         ]
            //                     }
            //                 ])
            //         }
            //     }
            // })

            // .state('home.about',{
            //     url:    '/about',
            //     templateUrl: '/index/about',
            //     title: 'about',
            //     resolve: {
            //         loadPlugin: function ($ocLazyLoad) {
            //                 return $ocLazyLoad.load ([
            //                     {
            //                         name: 'vendors',
            //                         files: [
            //                             baseUrl + '/js/controllers/about.js'
            //                         ]
            //                     }
            //                 ])
            //         }
            //     }
            // })

            // .state('home.link',{
            //     url:    '/link',
            //     templateUrl: '/index/link',
            //     title: 'link',
            //     resolve: {
            //         loadPlugin: function ($ocLazyLoad) {
            //                 return $ocLazyLoad.load ([
            //                     {
            //                         name: 'vendors',
            //                         files: [
            //                             baseUrl + '/js/controllers/link.js'
            //                         ]
            //                     }
            //                 ])
            //         }
            //     }
            // })

            // .state('home.view',{
            //     url:    '/view',
            //     templateUrl: '/index/view',
            //     title: 'add',
            //     controller: 'edituserCtrl',
            //     resolve: {
            //         loadPlugin: function ($ocLazyLoad) {
            //                 return $ocLazyLoad.load ([
            //                     {
            //                         name: 'vendors',
            //                         files: [
            //                             baseUrl + '/js/controllers/view.js'
            //                         ]
            //                     }
            //                 ])
            //         }
            //     }
            // })

            // .state('home.activity2',{
            //     url:    '/activity2',
            //     templateUrl: '/index/activity2',
            //     title: 'activity2',
            //     controller: 'activity2Ctrl',
            //     resolve: {
            //         loadPlugin: function ($ocLazyLoad) {
            //                 return $ocLazyLoad.load ([
            //                     {
            //                         name: 'vendors',
            //                         files: [
            //                             baseUrl + '/js/controllers/activity2.js'
            //                         ]
            //                     }
            //                 ])
            //         }
            //     }
            // })

    }

]);
