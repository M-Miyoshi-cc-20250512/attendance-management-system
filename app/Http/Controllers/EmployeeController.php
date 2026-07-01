<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Models\WorkCategory;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index()
    {
        $users = User::with(
            'workCategory'
        )
            ->orderBy('employee_no')
            ->get();

        return Inertia::render(
            'Employee/Index',
            [
                'users' => $users,
            ]
        );
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);

        $workCategories =
            WorkCategory::orderBy('id')
            ->get();

        return Inertia::render(
            'Employee/Edit',
            [
                'user' => $user,
                'workCategories' => $workCategories,
            ]
        );
    }

    public function update(
        Request $request,
        $id
    ) {
        $user = User::findOrFail($id);

        $user->update([
            'employee_no' =>
            $request->employee_no,

            'work_category_id' =>
            $request->work_category_id,
        ]);

        return response()->json([
            'success' => true
        ]);
    }
}
