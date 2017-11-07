angular.module('Training', [
	'ui.router',
	'oc.lazyLoad',
])
.controller("HomeCtrl",function($scope, $http, $state){
	// $scope.search 		=	'';

	// $scope.form 		=	{};			// declare object

	// $scope.openKey		=	'';
	// $scope.users		=	[];

	// $scope.loginData	=	function(){
	// 	if(typeof($scope.form.email) == "undefined"){
	// 		alert("Email is Empty");
	// 	}
	// 	else if(typeof($scope.form.password) == "undefined"){
	// 		alert("Password is Empty");
	// 	}
	// 	else{
	// 		$http({
 //                	url: baseUrl + '/index/login',
 //                	method: "POST",
 //                	headers: {'Content-Type': 'application/x-www-form-urlencoded'},
 //                	data:{
 //                		email : $scope.form.email,
 //                		password : $scope.form.password
 //                	}
 //            	})
 //            .then(
 //                function successCallback(response){
 //                    var data    =   response.data;
 //                    if (data.statusCode == 200) {
 //                       $scope.users    =   data.devMessage;
 //                        if (data.devMessage == '') {
	// 						alert("Account Not Found!!");
 //                        }
 //                        else{
 //                            if(data.devMessage.session){
 //                                window.location.reload();
 //                            }
 //                        }
 //                    }
 //                    else{

 //                    }

 //                },
 //                function errorCallback(responce){

 //                }
 //            );
	// 	}
	// }

	$scope.logoutData	=	function(){
		// console.log("Logout");
		$http({
            url: baseUrl + '/index/logout',
            method: "GET",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            params: {}
        })
        .then(
            function successCallback(response){
             window.location.reload();
            },
            function errorCallback(responce){

            }
        );
	}

	// $scope.setData		=	function(){
	// 	// alert($scope.firstName);

	// 	// console.log(document.getElementById('comboBox').value);
	// 	// console.log(angular.element('#comboBox option:selected').val());
	// 	// console.log($scope.selectStatus);
	// 	var status 	=	angular.element('#comboBox option:selected').val();

	// 	if(typeof($scope.form.firstName) == "undefined"){					// assign variable in object
	// 		alert("First Name is empty");
	// 	}
	// 	else if(typeof($scope.form.lastName) == "undefined"){				// assign variable in object
	// 		alert("Last Name is empty");
	// 	}
	// 	else if(typeof($scope.form.email) == "undefined"){					// assign variable in object
	// 		alert("Email is empty");
	// 	}
	// 	else if(typeof($scope.form.password) == "undefined"){				// assign variable in object
	// 		alert("Password is empty");
	// 	}
	// 	else if(status == ""){
	// 		alert("Please select status");
	// 	}
	// 	else{
	// 		$http({
 //                    url: baseUrl + '/index/set',
 //                    method: "POST",
 //                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
 //                    // data: $.params({
 //                    data:{
 //                        'firstName': $scope.form.firstName,
 //                        'lastName': $scope.form.lastName,
 //                        'email': $scope.form.email,
 //                        'password' : $scope.form.password,
 //                        'status' : status,
 //                        'openKey': $scope.openKey
 //                    }//)
 //                })
 //                .then(
 //                    function successCallback(response){
 //                        var data    =   response.data;

 //                        if(data.statusCode == 200){

 //                        	if($scope.openKey == ''){
 //                        		alert("Record Saved");
 //                        	}
 //                        	else{
 //                        		alert("Record Updated");
 //                        	}

 //                            // $scope.firstName	=	"";
 //                            // $scope.lastName		=	"";
 //                            // $scope.email 		=	"";
 //                            // $scope.password 	=	"";
 //                            // $scope.openKey		=	"";

 //                            $scope.form 	=	{};		// CLEAR FORM


 //                            $scope.getData();
 //                        }
 //                        else{

 //                        }
 //                    },
 //                    function errorCallback(response){

 //                    }
 //                );
	// 	}
	// }

	// $scope.getData		=	function(){
	// 	$http({
 //            method: 'GET',
 //            url: baseUrl + '/index/get',
 //            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
 //            params:{
 //            }
 //        })
 //        .then(
 //            function successCallback(response){
 //                var data    =   response.data;
 //                if(data.statusCode === 200){
 //                    if(data.devMessage != ""){
 //                    	$scope.users    =   data.devMessage;
 //                    }
 //                    else{
 //                    	$scope.users	=	[];
 //                    }
 //                }
 //                else{
 //                    alert(data.devMessage);
 //                }
 //            },
 //            function errorCallback(response){

 //            }
 //        );
	// }

	// $scope.getInfo		=	function(){

	// 	var checkbox	=	document.querySelectorAll('.checkbox:checked');

	// 	var check

	// 	if(checkbox.length == 1){
	// 		var id  =   checkbox[0].value;
	// 		$http({
	//             method: 'GET',
	//             url: baseUrl + '/index/getInfo/'+id,
	//             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	//             params:{
	//             }
	//         })
	//         .then(
	//             function successCallback(response){
	//                 var data    =   response.data;
	//                 if(data.statusCode === 200){
	//                 	console.log(data.devMessage);
	//                     $scope.form.firstName		=	data.devMessage.firstName;
	//                     $scope.form.lastName		=	data.devMessage.lastName;
	//                     $scope.form.email			=	data.devMessage.email;
	//                     $scope.form.password		=	data.devMessage.password;
	//                     $scope.form.selectStatus	=	data.devMessage.selectStatus;
	//                     $scope.openKey				=	id;
	//                 }
	//                 else{
	//                     alert(data.devMessage);
	//                 }
	//             },
	//             function errorCallback(response){

	//             }
	//         );
	// 	}
	// 	else{
	// 		alert("Please select one Record");
	// 	}
	// }

	// $scope.deleteData	=	function(){
	// 	var checkbox	=	document.querySelectorAll('.checkbox:checked');
	// 	var deleteItems	=	[];

	// 	if(checkbox.length != 0){
	// 		for(var i = 0; i < checkbox.length; i++){
	// 			deleteItems.push({
	// 				key : checkbox[i].value 									//id of the user
	// 			});
	// 		}
	// 		$http({
	//             method: 'POST',
	//             url: baseUrl + '/index/delete',
	//             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	//             data:{
	//             	'list' : deleteItems
	//             }
	//         })
	//         .then(
	//             function successCallback(response){
	//                 var data    =   response.data;
	//                 console.log(data);
	//                 if(data.statusCode === 200){
	//                     alert("Record Deleted");

	//                     $scope.getData();
	//                 }
	//                 else{
	//                     // alert(data.devMessage);
	//                 }
	//             },
	//             function errorCallback(response){

	//             }
	//         );
	// 	}
	// 	else{
	// 		alert("Please select at least one Record");
	// 	}
	// }

	// $scope.searchData	=	function(search){
	// 	if($scope.search.trim().length == 0){
	// 		alert("Please input Last name to search");
	// 	}
	// 	else{
	// 		$http({
	//             method: 'GET',
	//             url: baseUrl + '/index/search/'+search,
	//             headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	//             params:{
	//             }
	//         })
	//         .then(
	//             function successCallback(response){
	//                 var data    =   response.data;
	//                 if(data.statusCode === 200){
	//                     if(data.devMessage != ""){
	//                     	// alert("Record Found");
	//                     	$scope.users    =   data.devMessage;
	//                     }
	//                     else{
	//                     	// alert("No Record Found");
	//                     	$scope.users	=	[];
	//                     }
	//                 }
	//                 else{
	//                     alert(data.devMessage);
	//                 }
	//             },
	//             function errorCallback(response){

	//             }
	//         );
	// 	}
	// }

	// $scope.filterData	=	function(search){
	// 	if($scope.search.trim().length == 0){
	// 		$scope.getData();
	// 	}
	// 	else{
	// 		$scope.searchData(search);
	// 	}
	// }

	// $scope.destroySession 	= function(){
	// 	$http({
 //            method: 'GET',
 //            url: baseUrl + '/index/destroy',
 //            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
 //            params:{
 //            }
 //        })
 //        .then(
 //            function successCallback(response){
 //               window.location.reload();
 //            },
 //            function errorCallback(response){

 //            }
 //        );
	// }

	$scope.redirect	= function(){
		$state.go("home.activity");
	}

	$scope.redirect();

	// $scope.getData();

})
