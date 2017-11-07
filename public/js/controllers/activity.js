angular.module('Training', [
	'ui.router',
	'oc.lazyLoad',
])
.controller("ActivityCtrl",function($scope, $http, $state){
	$scope.openKey 		=	'';
	$scope.form 		=	{};
	$scope.showForm		=	false;

	$scope.closeForm	=	function(){
		$scope.form 	=	{};

		for(var x=0;x < angular.element('.checkbox').length;x++){
			angular.element('.checkbox')[x].checked= false;
		}

		$scope.showForm = false;
	}

	$scope.setData		=	function(){
		// alert($scope.firstName);

		// console.log(document.getElementById('comboBox').value);
		// console.log(angular.element('#comboBox option:selected').val());
		// console.log($scope.selectStatus);
		var status 	=	angular.element('#comboBox option:selected').val();

		if(typeof($scope.form.firstName) == "undefined"){					// assign variable in object
			alert("First Name is empty");
		}
		else if(typeof($scope.form.lastName) == "undefined"){				// assign variable in object
			alert("Last Name is empty");
		}
		else if(typeof($scope.form.email) == "undefined"){					// assign variable in object
			alert("Email is empty");
		}
		else if(typeof($scope.form.password) == "undefined"){				// assign variable in object
			alert("Password is empty");
		}
		else if(status == ""){
			alert("Please select status");
		}
		else{
			$http({
                    url: baseUrl + '/index/set',
                    method: "POST",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    // data: $.params({
                    data:{
                        'firstName': $scope.form.firstName,
                        'lastName': $scope.form.lastName,
                        'email': $scope.form.email,
                        'password' : $scope.form.password,
                        'status' : status,
                        'openKey': $scope.openKey
                    }//)
                })
                .then(
                    function successCallback(response){
                        var data    =   response.data;

                        if(data.statusCode == 200){

                        	if($scope.openKey == ''){
                        		alert("Record Saved");
                        	}
                        	else{
                        		alert("Record Updated");
                        	}

                            // $scope.firstName	=	"";
                            // $scope.lastName		=	"";
                            // $scope.email 		=	"";
                            // $scope.password 	=	"";
                            // $scope.openKey		=	"";

                            $scope.form 	=	{};		// CLEAR FORM

                            $scope.showForm = false;
                            $scope.getData();
                        }
                        else{

                        }
                    },
                    function errorCallback(response){

                    }
                );
		}
	}

	$scope.getData		=	function(){
		$http({
            method: 'GET',
            url: baseUrl + '/index/get',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            params:{
            }
        })
        .then(
            function successCallback(response){
                var data    =   response.data;
                if(data.statusCode === 200){
                    if(data.devMessage != ""){
                    	$scope.users    =   data.devMessage;
                    }
                    else{
                    	$scope.users	=	[];
                    }
                }
                else{
                    alert(data.devMessage);
                }
            },
            function errorCallback(response){

            }
        );
	}

	$scope.getInfo		=	function(){

		var checkbox	=	document.querySelectorAll('.checkbox:checked');
		if(checkbox.length == 1){
			$scope.showForm = true;

			var id  =   checkbox[0].value;
			$http({
	            method: 'GET',
	            url: baseUrl + '/index/getInfo/'+id,
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	            params:{
	            }
	        })
	        .then(
	            function successCallback(response){
	                var data    =   response.data;
	                if(data.statusCode === 200){
	                    $scope.form.firstName		=	data.devMessage.firstName;
	                    $scope.form.lastName		=	data.devMessage.lastName;
	                    $scope.form.email			=	data.devMessage.email;
	                    $scope.form.password		=	data.devMessage.password;
	                    $scope.form.selectStatus	=	data.devMessage.selectStatus;
	                    $scope.openKey				=	id;
	                }
	                else{
	                    alert(data.devMessage);
	                }
	            },
	            function errorCallback(response){

	            }
	        );
		}
		else{
			$scope.showForm = false;
			alert("Please select one Record");

		}
	}

	$scope.deleteData	=	function(){
		var checkbox	=	document.querySelectorAll('.checkbox:checked');
		var deleteItems	=	[];

		if(checkbox.length != 0){
			for(var i = 0; i < checkbox.length; i++){
				deleteItems.push({
					key : checkbox[i].value 									//id of the user
				});
			}
			$http({
	            method: 'POST',
	            url: baseUrl + '/index/delete',
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	            data:{
	            	'list' : deleteItems
	            }
	        })
	        .then(
	            function successCallback(response){
	                var data    =   response.data;
	                console.log(data);
	                if(data.statusCode === 200){
	                    alert("Record Deleted");

	                    $scope.getData();

	                }
	                else{
	                    // alert(data.devMessage);
	                }
	            },
	            function errorCallback(response){

	            }
	        )
	        .finally(function(){
	        	angular.element('.all-checkbox')[0].checked=false;
	        });
		}
		else{
			alert("Please select at least one Record");
			angular.element('.all-checkbox')[0].checked=false;
		}
	}

	$scope.searchData	=	function(search){
		if($scope.search.trim().length == 0){
			alert("Please input Last name to search");
		}
		else{
			$http({
	            method: 'GET',
	            url: baseUrl + '/index/search/'+search,
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	            params:{
	            }
	        })
	        .then(
	            function successCallback(response){
	                var data    =   response.data;
	                if(data.statusCode === 200){
	                    if(data.devMessage != ""){
	                    	// alert("Record Found");
	                    	$scope.users    =   data.devMessage;
	                    }
	                    else{
	                    	// alert("No Record Found");
	                    	$scope.users	=	[];
	                    }
	                }
	                else{
	                    alert(data.devMessage);
	                }
	            },
	            function errorCallback(response){

	            }
	        );
		}
	}

	$scope.searchbyStatus	=	function(search){
		var status 	=	angular.element('#filterbyStatus option:selected').val();

		if(status == ""){
			alert("Please select status");
		}
		else{
			$http({
	            method: 'GET',
	            url: baseUrl + '/index/filter/'+search,
	            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	            params:{
	            }
	        })
	        .then(
	            function successCallback(response){
	                var data    =   response.data;
	                if(data.statusCode === 200){
	                    if(data.devMessage != ""){
	                    	// alert("Record Found");
	                    	$scope.users    =   data.devMessage;
	                    }
	                    else{
	                    	// alert("No Record Found");
	                    	$scope.users	=	[];
	                    }
	                }
	                else{
	                    alert(data.devMessage);
	                }
	            },
	            function errorCallback(response){

	            }
	        );
		}
	}

	$scope.filterData	=	function(search){
		if($scope.search.trim().length == 0){
			$scope.getData();
		}
		else{
			$scope.searchData(search);
		}
	}

	$scope.filterStatus	=	function(search){
		var status 	=	angular.element('#filterbyStatus option:selected').val();

		if(status == "All"){
			$scope.getData();
		}
		else if(status == "Admin" || status == "Guest"){
			$scope.searchbyStatus(search);
		}
		else{
			alert("Invalid");
		}
	}

	$scope.selectAll 	= function(ev){
		if(ev.currentTarget.checked){
			for(var x=0;x < angular.element('.checkbox').length;x++){
				angular.element('.checkbox')[x].checked= true;
			}
		}
		else{
			for(var x=0;x < angular.element('.checkbox').length;x++){
				angular.element('.checkbox')[x].checked= false;
			}
		}
	}

	$scope.getData();
})
