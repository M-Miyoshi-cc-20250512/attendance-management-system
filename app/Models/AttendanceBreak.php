<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AttendanceBreak extends Model
{
    protected $table = 'attendance_breaks';

    protected $fillable = [
        'attendance_daily_id',
        'break_start_at',
        'break_end_at',
    ];
}
