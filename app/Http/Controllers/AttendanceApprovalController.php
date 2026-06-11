<?php

namespace App\Http\Controllers;

use App\Models\AttendanceDaily;
use App\Models\User;
use App\Models\WorkTypeMaster;
use App\Models\Location;
use App\Models\AttendanceBreak;
use App\Models\UserWorkSetting;
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
        $employeeNo = $request->employee_no;
        $employeeName = $request->employee_name;
        $location = $request->location;
        $status = $request->status;

        $query = User::query();

        if ($employeeNo) {
            $query->where(
                'employee_no',
                'like',
                "%{$employeeNo}%"
            );
        }

        if ($employeeName) {
            $query->where(
                'name',
                'like',
                "%{$employeeName}%"
            );
        }

        if ($location) {
            $query->whereHas(
                'attendanceDaily',
                function ($q) use (
                    $location,
                    $targetDate
                ) {

                    $q->whereDate(
                        'target_date',
                        $targetDate
                    );

                    $q->whereHas(
                        'location',
                        function ($locationQuery) use (
                            $location
                        ) {

                            $locationQuery->where(
                                'name',
                                $location
                            );
                        }
                    );
                }
            );
        }

        if ($status) {

            $query->whereHas(
                'attendanceDaily',
                function ($q) use (
                    $status,
                    $targetDate
                ) {

                    $q->whereDate(
                        'target_date',
                        $targetDate
                    );

                    $q->where(
                        'status',
                        $status
                    );
                }
            );
        }

        $users = $query->with([
            'workSetting',
            'attendanceDaily' => function ($query) use ($targetDate) {
                $query
                    ->with([
                        'location',
                        'attendanceBreak'
                    ])
                    ->whereDate(
                        'target_date',
                        $targetDate
                    );
            }
        ])->get();

        return response()->json($users);
    }

    public function approve($id)
    {
        $attendance = AttendanceDaily::findOrFail($id);

        $attendance->status = '承認済';

        $attendance->save();

        return response()->json([
            'success' => true
        ]);
    }

    public function reject($id)
    {
        $attendance = AttendanceDaily::findOrFail($id);

        $attendance->status = '差し戻し';

        $attendance->save();

        return response()->json([
            'success' => true
        ]);
    }

    public function approveAll(Request $request)
    {
        AttendanceDaily::where(
            'target_date',
            $request->target_date
        )
            ->where(
                'status',
                '申請中'
            )
            ->update([
                'status' => '承認済'
            ]);

        return response()->json([
            'success' => true
        ]);
    }

    public function edit($id)
    {
        $attendance = AttendanceDaily::with(
            'attendanceBreak'
        )->findOrFail($id);

        $workTypes = WorkTypeMaster::all();
        $locations = Location::all();

        return Inertia::render(
            'AttendanceApproval/Edit',
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

        return redirect('/attendance/approval');
    }
}
