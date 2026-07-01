<?php

namespace App\Http\Controllers;

use App\Models\AttendanceDaily;
use App\Models\LeaveTypeMaster;
use App\Models\LeaveApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LeaveApplicationController extends Controller
{
    public function index()
    {
        return Inertia::render(
            'Attendance/LeaveApplication/Create',
            [
                'user' => Auth::user(),
            ]
        );
    }

    public function listIndex()
    {
        return Inertia::render(
            'Attendance/LeaveApplication/Index'
        );
    }

    public function leaveTypes()
    {
        return LeaveTypeMaster::select(
            'id',
            'code',
            'name'
        )
            ->orderBy('id')
            ->get();
    }

    public function store(Request $request)
    {
        LeaveApplication::create([
            'user_id' => Auth::id(),
            'application_date' => $request->application_date,
            'leave_type_id' => $request->leave_type_id,
            'reason' => $request->reason,
            'status' => '申請中',
        ]);

        return response()->json([
            'success' => true
        ]);
    }

    public function approve($id)
    {
        $leaveApplication =
            LeaveApplication::with('leaveType')
            ->findOrFail($id);

        $leaveApplication->update([
            'status' => '承認済',
        ]);

        AttendanceDaily::updateOrCreate(
            [
                'user_id' => $leaveApplication->user_id,
                'target_date' => $leaveApplication->application_date,
            ],
            [
                'leave_type_id' => $leaveApplication->leave_type_id,
                'status' => '承認済',
                'location_id' => 1,
            ]
        );

        return response()->json([
            'message' => '承認が完了しました'
        ]);
    }

    public function list(Request $request)
    {
        $query = LeaveApplication::with('leaveType')
            ->whereIn(
                'status',
                ['申請中', '差し戻し']
            );

        if ($request->application_date) {
            $query->whereDate(
                'created_at',
                $request->application_date
            );
        }

        if ($request->leave_type_id) {
            $query->where(
                'leave_type_id',
                $request->leave_type_id
            );
        }

        if ($request->target_date) {
            $query->whereDate(
                'application_date',
                $request->target_date
            );
        }

        return response()->json(
            $query
                ->orderBy('application_date')
                ->get()
        );
    }

    public function approvalIndex()
    {
        return Inertia::render(
            'Attendance/LeaveApplication/Approval'
        );
    }

    public function approvalList(Request $request)
    {
        $query = LeaveApplication::with([
            'user',
            'leaveType'
        ])
            ->whereIn(
                'status',
                ['申請中', '差し戻し']
            );

        //申請日
        if ($request->application_date) {

            $query->whereDate(
                'created_at',
                $request->application_date
            );
        }

        //社員番号
        if ($request->employee_no) {

            $query->whereHas(
                'user',
                function ($q) use ($request) {

                    $q->where(
                        'employee_no',
                        'like',
                        '%' . $request->employee_no . '%'
                    );
                }
            );
        }

        //氏名
        if ($request->name) {

            $query->whereHas(
                'user',
                function ($q) use ($request) {

                    $q->where(
                        'name',
                        'like',
                        '%' . $request->name . '%'
                    );
                }
            );
        }

        //申請区分
        if ($request->leave_type_id) {

            $query->where(
                'leave_type_id',
                $request->leave_type_id
            );
        }

        //対象日
        if ($request->target_date) {

            $query->whereDate(
                'application_date',
                $request->target_date
            );
        }

        return response()->json(
            $query
                ->orderByDesc('created_at')
                ->get()
        );
    }

    public function reject($id)
    {
        $leaveApplication =
            LeaveApplication::findOrFail($id);

        $leaveApplication->update([
            'status' => '差し戻し'
        ]);

        return response()->json([
            'message' => '差し戻しました'
        ]);
    }

    public function edit($id)
    {
        $leaveApplication =
            LeaveApplication::with(
                'user',
                'leaveType'
            )
            ->findOrFail($id);

        $leaveTypes =
            LeaveTypeMaster::select(
                'id',
                'code',
                'name'
            )
            ->orderBy('id')
            ->get();

        return Inertia::render(
            'Attendance/LeaveApplication/Edit',
            [
                'leaveApplication' => $leaveApplication,
                'leaveTypes' => $leaveTypes,
            ]
        );
    }

    public function update(Request $request, $id)
    {
        $leaveApplication =
            LeaveApplication::findOrFail($id);

        $leaveApplication->update([
            'leave_type_id' => $request->leave_type_id,
            'application_date' => $request->application_date,
            'reason' => $request->reason,
        ]);

        return response()->json([
            'success' => true
        ]);
    }
}
