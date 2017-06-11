//employeesController
/*
    Introduction

    app.controller('employeesController', function($scope, $http, APIURL){…} 
    defines a controller employeesController in the app variable that we created in /app/app.js. 
    We have injected $scope, $http, and a contant APIURL as dependencies

    $http.get(APIURL + "employees").success(function(response) {$scope.employees = response;}); 
    uses Angular $http to call the API. APIURL + "employees" is passed as a parameter to $http. 
    If the call is successful, the response to passed to .success anonymous function. 
    The anonymous function assigns the response to $scope.employees variable. 
    The $scope.employees variable will be available in our view.

    $scope.toggle = function(modalstate, id) {…} displays the modal form

    $scope.save = function(modalstate, id){…} saves a new record / updates an existing record
    $scope.confirmDelete = function(id){…} deletes an existing record
*/
app.controller('employeesController', function($scope, $http, API_URL) {
    //retrieve employees listing from API
    $http.get(API_URL + "employees")
            .success(function(response) {
                $scope.employees = response;
            });
    
    //show modal form
    $scope.toggle = function(modalstate, id) {
        $scope.modalstate = modalstate;

        switch (modalstate) {
            case 'add':
                $scope.form_title = "Add New Employee";
                break;
            case 'edit':
                $scope.form_title = "Employee Detail";
                $scope.id = id;
                $http.get(API_URL + 'employees/' + id)
                        .success(function(response) {
                            console.log(response);
                            $scope.employee = response;
                        });
                break;
            default:
                break;
        }
        console.log(id);
        $('#myModal').modal('show');
    }

    //save new record / update existing record
    $scope.save = function(modalstate, id) {
        var url = API_URL + "employees";
        
        //append employee id to the URL if the form is in edit mode
        if (modalstate === 'edit'){
            url += "/" + id;
        }
        
        $http({
            method: 'POST',
            url: url,
            data: $.param($scope.employee),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response) {
            console.log(response);
            location.reload();
        }).error(function(response) {
            console.log(response);
            alert('This is embarassing. An error has occured. Please check the log for details');
        });
    }

    //delete record
    $scope.confirmDelete = function(id) {
        var isConfirmDelete = confirm('Are you sure you want this record?');
        if (isConfirmDelete) {
            $http({
                method: 'DELETE',
                url: API_URL + 'employees/' + id
            }).
                    success(function(data) {
                        console.log(data);
                        location.reload();
                    }).
                    error(function(data) {
                        console.log(data);
                        alert('Unable to delete');
                    });
        } else {
            return false;
        }
    }
});
