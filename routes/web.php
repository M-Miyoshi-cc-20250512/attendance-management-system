<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AttendancePunchController;
use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\AttendanceDailyController;
use App\Http\Controllers\AttendanceApprovalController;

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
    Route::get('/attendance/daily/{id}/edit',[AttendanceDailyController::class,'edit']);
    Route::put('/attendance/daily/{id}',[AttendanceDailyController::class, 'update']);
    
    Route::get('/attendance/approval',[AttendanceApprovalController::class, 'index']);
    
});

require __DIR__.'/auth.php';
