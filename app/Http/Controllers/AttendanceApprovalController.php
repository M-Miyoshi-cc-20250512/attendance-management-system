<?php

namespace App\Http\Controllers;

use App\Models\AttendanceDaily;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AttendanceApprovalController extends Controller
{
    public function index()
    {
        return Inertia::render('AttendanceApproval/Index');
    }

    public function list()
    {
        $attendances = AttendanceDaily::with([
            'user',
            'workType',
            'location',
            'attendanceBreak'
        ])->get();
        
        return response()->json($attendances);
    }
}
