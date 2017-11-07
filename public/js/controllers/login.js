
angular.module('Training', [
	'ui.router',
	'oc.lazyLoad',
])
.controller('LoginCtrl', ['$scope','$http',

	function($scope, $http){
		$scope.search 		=	'';

		$scope.form 		=	{};			// declare object

		$scope.openKey		=	'';
		$scope.users		=	[];

		$scope.loginData	=	function(){
			if(typeof($scope.form.email) == "undefined"){
				alert("Email is Empty");
			}
			else if(typeof($scope.form.password) == "undefined"){
				alert("Password is Empty");
			}
			else{
				$http({
	                	url: baseUrl + '/index/login',
	                	method: "POST",
	                	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	                	data:{
	                		email : $scope.form.email,
	                		password : $scope.form.password
	                	}
	            	})
	            .then(
	                function successCallback(response){
	                    var data    =   response.data;
	                    if (data.statusCode == 200) {
	                       $scope.users    =   data.devMessage;
	                        if (data.devMessage == '') {
								alert("Account Not Found!!");
	                        }
	                        else{
	                            if(data.devMessage.session){
	                                window.location.reload();
	                            }
	                        }
	                    }
	                    else{

	                    }

	                },
	                function errorCallback(responce){

	                }
	            );
			}
		}
}])
