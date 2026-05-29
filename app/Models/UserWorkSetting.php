<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserWorkSetting extends Model
{
    protected $table = 'user_work_settings';

    protected $fillable = [
        'user_id',
        'prescribed_minutes_per_day',
        'standard_break_minutes',
        'standard_start_time',
        'standard_end_time',
        'valid_from',
        'valid_to',
    ];
}