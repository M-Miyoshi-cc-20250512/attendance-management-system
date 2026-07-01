<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AttendancePunchController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\AttendanceDailyController;
use App\Http\Controllers\AttendanceApprovalController;
use App\Http\Controllers\LeaveApplicationController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\WorkTypeMasterController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    // 打刻
    Route::get('/attendance', [AttendancePunchController::class, 'index'])->name('attendance');
    Route::post('/attendance/start', [AttendanceController::class, 'start']);
    Route::post('/attendance/end', [AttendanceController::class, 'end']);
    Route::get('/attendance/status', [AttendanceController::class, 'status']);
    // 日次申請
    Route::get('/attendance/daily', [AttendanceDailyController::class, 'index']);
    Route::post('/attendance/daily/monthly', [AttendanceDailyController::class, 'monthly']);
    Route::get('/attendance/daily/{id}/edit', [AttendanceDailyController::class, 'edit']);
    Route::put('/attendance/daily/{id}', [AttendanceDailyController::class, 'update']);
    Route::post('/attendance/daily/{id}/apply', [AttendanceDailyController::class, 'apply']);
    // 勤怠承認
    Route::get('/attendance/approval', [AttendanceApprovalController::class, 'index']);
    Route::get('/attendance/approval/list', [AttendanceApprovalController::class, 'list']);
    Route::post('/attendance/approval/{id}/approve', [AttendanceApprovalController::class, 'approve']);
    Route::post('/attendance/approval/{id}/reject', [AttendanceApprovalController::class, 'reject']);
    Route::post('/attendance/approval/approve-all', [AttendanceApprovalController::class, 'approveAll']);
    Route::get('/attendance/approval/{id}/edit', [AttendanceApprovalController::class, 'edit']);
    Route::put('/attendance/approval/{id}', [AttendanceApprovalController::class, 'update']);
    // 届出申請
    Route::get('/attendance/leave/create', [LeaveApplicationController::class, 'index']);
    Route::get('/leave-types', [LeaveApplicationController::class, 'leaveTypes']);
    Route::post('/leave-applications', [LeaveApplicationController::class, 'store']);
    Route::get('/attendance/leave', [LeaveApplicationController::class, 'listIndex']);
    Route::post('/leave-applications/{id}/approve', [LeaveApplicationController::class, 'approve']);
    Route::get('/leave-applications/list', [LeaveApplicationController::class, 'list']);
    // 届出承認
    Route::get('/attendance/leave/approval', [LeaveApplicationController::class, 'approvalIndex']);
    Route::post('/leave-applications/{id}/reject', [LeaveApplicationController::class, 'reject']);
    Route::get('/leave-applications/approval-list', [LeaveApplicationController::class, 'approvalList']);
    Route::get('/attendance/leave/approval/{id}/edit', [LeaveApplicationController::class, 'edit']);
    Route::put('/attendance/leave/{id}', [LeaveApplicationController::class, 'update']);

    // 社員管理
    Route::get('/employee', [EmployeeController::class, 'index']);
    Route::get('/employee/{id}/edit', [EmployeeController::class, 'edit']);
    Route::put('/employee/{id}', [EmployeeController::class, 'update']);

    // 勤務区分管理
    Route::get(
        '/system/work-type',
        [WorkTypeMasterController::class, 'index']
    );
    Route::get(
        '/system/work-type/{id}/edit',
        [WorkTypeMasterController::class, 'edit']
    );
    Route::put(
        '/system/work-type/{id}',
        [WorkTypeMasterController::class, 'update']
    );
    Route::post(
        '/system/work-type/{id}/up',
        [WorkTypeMasterController::class, 'moveUp']
    );
    Route::post(
        '/system/work-type/{id}/down',
        [WorkTypeMasterController::class, 'moveDown']
    );
    Route::get(
        '/system/work-type/create',
        [WorkTypeMasterController::class, 'create']
    );
    Route::post(
        '/system/work-type',
        [WorkTypeMasterController::class, 'store']
    );
});

require __DIR__ . '/auth.php';
