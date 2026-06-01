<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\WorkTypeMaster;

class AttendanceDaily extends Model
{
    protected $table = 'attendance_daily';
    protected $fillable = [
        'user_id',
        'target_date',
        'work_type_id',
        'location_id',
        'start_at',
        'end_at',
        'is_next_day',
        'transportation_cost',
        'remarks',
        'status',
        'approved_comment',
        'raw_in_punch_id',
        'raw_out_punch_id',
        'actual_work_minutes',
        'overtime_minutes',
        'late_night_minutes',
    ];

    public function workType()

    {
        return $this->belongsTo(WorkTypeMaster::class);
    }

    public function attendanceBreak()
    {
        return $this->hasOne(
            AttendanceBreak::class,
            'attendance_daily_id'
        );
    }
}
