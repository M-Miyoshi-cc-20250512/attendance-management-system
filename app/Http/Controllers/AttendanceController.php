<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\AttendanceRawPunch;

class AttendanceController extends Controller
{
    public function start(Request $request)
    {
        AttendanceRawPunch::create([
            'user_id' => Auth::id(),
            'punch_type' => 'IN',
            'punched_at' => now(),
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'location_id' => $request->location_id,
            'source' => 'WEB'
        ]);

        return response()->json([
            'message' => '出勤打刻完了'
        ]);
    }

    public function end(Request $request)
    {
        AttendanceRawPunch::create([
            'user_id' => Auth::id(),
            'punch_type' => 'OUT',
            'punched_at' => now(),
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'location_id' => $request->location_id,
            'source' => 'WEB',
        ]);

        return response()->json([
            'message' => '退勤打刻完了'
        ]);
    }
}
