<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\AttendanceRawPunch;
use App\Models\AttendanceDaily;
use App\Models\WorkTypeMaster;
use Database\Seeders\WorkTypeMasterSeeder;

class AttendanceController extends Controller
{
    public function start(Request $request)
    {
        $rawPunch = AttendanceRawPunch::create([
            'user_id' => Auth::id(),
            'punch_type' => 'IN',
            'punched_at' => now(),
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'location_id' => $request->location_id,
            'source' => 'WEB'
        ]);

        $dayNumber = now()->dayOfWeek;
        if($dayNumber === 0 || $dayNumber === 6){
            $workType = WorkTypeMaster::where('name', '公休')->first();
        }else{
            $workType = WorkTypeMaster::where('name', '09:00-18:00')->first();
        }

        AttendanceDaily::create([
            'user_id' => Auth::id(),
            'target_date' => now()->toDateString(),
            'location_id' => $request->location_id,
            'work_type_id' => $workType->id,
            'start_at' => $rawPunch->punched_at,
            'status' => '未申請',
            'raw_in_punch_id' => $rawPunch->id,
        ]);

        return response()->json([
            'message' => '出勤打刻完了'
        ]);
    }

    public function end(Request $request)
    {
        $rawPunch = AttendanceRawPunch::create([
            'user_id' => Auth::id(),
            'punch_type' => 'OUT',
            'punched_at' => now(),
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'location_id' => $request->location_id,
            'source' => 'WEB',
        ]);

        $attendanceDaily = AttendanceDaily::where('user_id', Auth::id())
            ->where('target_date', now()->toDateString())
            ->first();

        if ($attendanceDaily) {
            $attendanceDaily->update([
                'end_at' => $rawPunch->punched_at,
                'raw_out_punch_id' => $rawPunch->id,
            ]);
        }

        return response()->json([
            'message' => '退勤打刻完了'
        ]);
    }

    public function status()
    {
        $attendanceDaily = AttendanceDaily::where('user_id', Auth::id())
        ->where('target_date', now()->toDateString())
        ->first();

        if ($attendanceDaily && $attendanceDaily->start_at && !$attendanceDaily->end_at){
            return response()->json([
                'is_working' => true,
                'location_id' => $attendanceDaily->location_id,
            ]);
        }
        return response()->json([
            'is_working' => false,
        ]);
    }
}
