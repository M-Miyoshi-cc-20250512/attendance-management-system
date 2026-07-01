<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LeaveTypeMaster extends Model
{
    protected $table = 'leave_type_master';

    protected $fillable = [
        'code',
        'name',
    ];

    public function leaveApplications()
    {
        return $this->hasMany(
            LeaveApplication::class,
            'leave_type_id'
        );
    }
}