<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkTypeMaster extends Model
{
    protected $table = 'work_type_master';

    protected $fillable = [
        'code',
        'name',
        'is_attendance_counted',
        'start_time',
        'end_time',
        'break_minutes',
        'is_visible',
        'display_order',
        'is_default',
    ];
}
