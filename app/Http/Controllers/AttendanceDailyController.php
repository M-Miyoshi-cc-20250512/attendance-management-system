<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\AttendanceDaily;
use App\Models\WorkTypeMaster;
use App\Models\AttendanceBreak;
use App\Models\UserWorkSetting;
use App\Models\Location;

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

        $data = AttendanceDaily::with([
            'workType',
            'attendanceBreak',
            'leaveType',
        ])
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

        $workTypes =
            WorkTypeMaster::where(
                'is_visible',
                true
            )
            ->orderBy(
                'display_order'
            )
            ->get();
        $locations = Location::all();

        return Inertia::render(
            'Attendance/Daily/Edit',
            [
                'attendance' => $attendance,
                'workTypes' => $workTypes,
                'locations' => $locations,
            ]
        );
    }

    public function update(Request $request, $id)
    {

        $attendance = AttendanceDaily::findOrFail($id);
        $startAt =
            $attendance->target_date .
            ' ' .
            $request->start_at .
            ':00';

        $endAt =
            $attendance->target_date .
            ' ' .
            $request->end_at .
            ':00';

        $breakStartAt =
            $attendance->target_date .
            ' ' .
            $request->break_start .
            ':00';

        $breakEndAt =
            $attendance->target_date .
            ' ' .
            $request->break_end .
            ':00';

        $startTimestamp = strtotime($startAt);
        $endTimestamp = strtotime($endAt);

        $workMinutes =
            ($endTimestamp - $startTimestamp) / 60;

        $breakStartTimestamp =
            strtotime($breakStartAt);

        $breakEndTimestamp =
            strtotime($breakEndAt);

        $breakMinutes =
            ($breakEndTimestamp - $breakStartTimestamp) / 60;

        $actualWorkMinutes =
            $workMinutes - $breakMinutes;

        $userWorkSetting =
            UserWorkSetting::where(
                'user_id',
                $attendance->user_id
            )->first();

        $prescribedMinutes =
            $userWorkSetting->prescribed_minutes_per_day;

        $overtimeMinutes =
            max(
                0,
                $actualWorkMinutes -
                    $prescribedMinutes
            );

        $attendance->update([
            'work_type_id' => $request->work_type_id,
            'location_id' => $request->location_id,
            'start_at' => $startAt,
            'end_at' => $endAt,
            'transportation_cost' => $request->transportation_cost,
            'remarks' => $request->remarks,
            'actual_work_minutes' => $actualWorkMinutes,
            'overtime_minutes' => $overtimeMinutes,
        ]);

        AttendanceBreak::where(
            'attendance_daily_id',
            $attendance->id
        )->delete();

        AttendanceBreak::create([
            'attendance_daily_id' => $attendance->id,
            'break_start_at' => $breakStartAt,
            'break_end_at' => $breakEndAt,
        ]);

        return redirect('/attendance/daily');
    }

    public function apply($id)
    {
        $attendance = AttendanceDaily::findOrFail($id);

        $attendance->update([
            'status' => '申請中',
        ]);

        return response()->json([
            'message' => '申請しました'
        ]);
    }
}
