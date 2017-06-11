<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    //fillable
    protected $fillable = array('id','name','contact_number','position');
}
