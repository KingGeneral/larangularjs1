<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Employee; // is model
// use Request; // for request

class Employees extends Controller
{
    /**
    * @return Display listing
    **/
     public function index($id = null){
     	if ($id == null) {
     		return Employee::orderBy('id','asc')->get();
     	}else{
     		return $this->show($id);
     	}
     }

    /**
    * @return store data
    **/
    public function store(Request $request){
    	$employees = new Employee;

    	$employees->name = $request->input('name');
    	$employees->email = $request->input('email');
    	$employees->contact_number = $request->input('contact_number');
    	$employees->position = $request->input('position');
    	$employees->save();

    	return 'Employees record successfully created with id ' . $employees->id.' & Name : '.$employees->name ;
    }

    /**
    * @return show id per data
    **/
    public function show($id){
    	return Employee::find($id);
    }

    /**
    * @return update data
    **/
    public function update(Request $request, $id){
    	$employees = Employee::find($id);

    	$employees->name = $request->input('name');
    	$employees->email = $request->input('email');
    	$employees->contact_number = $request->input('contact_number');
    	$employees->position = $request->input('position');

    	return 'Success Update user #'. $employees->id;
    }

    /**
    * @return delete data
    **/
    public function destroy(Request $request){
    	$employees = Employee::find($request->input('id'));

    	$employees->delete();

    	return "Employee record deleted".$request->input('id');
    }
}
