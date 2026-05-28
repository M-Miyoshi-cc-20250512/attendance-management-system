<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkTypeMaster extends Model
{
    protected $table = 'work_type_master';

    protected $fillable = [
        'code',
        'name',
    ];
}