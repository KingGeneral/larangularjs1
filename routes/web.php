<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    // return view('welcome');
    return view('index');
});

Route::get('public/api/v1/employees/{id?}', 'Employees@index');
Route::post('public/api/v1/employees', 'Employees@store');
Route::post('public/api/v1/employees/{id}', 'Employees@update');
Route::delete('public/api/v1/employees/{id}', 'Employees@destroy');