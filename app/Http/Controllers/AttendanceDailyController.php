<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\AttendanceDaily;
use App\Models\WorkTypeMaster;

class AttendanceDailyController extends Controller
{
    public function index()
    {
        return Inertia::render('Attendance/Daily/Index');
    }

    public function monthly(Request $request)
    {
        $month = $request->month;

        $start = $month . '-01';
        $end = date('Y-m-t', strtotime($start));

        $data = AttendanceDaily::with('workType')
            ->where('user_id', Auth::id())
            ->whereBetween('target_date', [$start, $end])
            ->orderBy('target_date')
            ->get();

        return response()->json($data);
    }

    public function edit($id)
    {
        $attendance = AttendanceDaily::with('workType')
            ->where('user_id', Auth::id())
            ->findOrFail($id);

        $workTypes = WorkTypeMaster::all();

        return Inertia::render(
            'Attendance/Daily/Edit',
            [
                'attendance' => $attendance,
                'workTypes' => $workTypes,
            ]
        );
    }
}
