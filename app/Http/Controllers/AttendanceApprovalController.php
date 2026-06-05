<?php

namespace App\Http\Controllers;

use App\Models\AttendanceDaily;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class AttendanceApprovalController extends Controller
{
    public function index()
    {
        return Inertia::render('AttendanceApproval/Index');
    }

    public function list(Request $request)
    {
        $targetDate = $request->target_date;

        $users = User::with([
            'workSetting',
            'attendanceDaily' => function ($query) use ($targetDate) {
                $query->whereDate(
                    'target_date',
                    $targetDate
                );
            }
        ])->get();

        return response()->json($users);
    }
}
