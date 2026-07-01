<?php

namespace App\Http\Controllers;

use App\Models\WorkTypeMaster;
use Inertia\Inertia;
use Illuminate\Http\Request;

class WorkTypeMasterController extends Controller
{
    public function index()
    {
        $workTypes =
            WorkTypeMaster::orderBy(
                'display_order'
            )
            ->get();

        return Inertia::render(
            'System/WorkType/Index',
            [
                'workTypes' => $workTypes,
            ]
        );
    }

    public function edit($id)
    {
        $workType =
            WorkTypeMaster::findOrFail($id);

        return Inertia::render(
            'System/WorkType/Edit',
            [
                'workType' => $workType,
            ]
        );
    }

    public function update(
        Request $request,
        $id
    ) {
        $workType =
            WorkTypeMaster::findOrFail($id);

        // デフォルトを付ける場合、
        // 他の勤務区分のデフォルトを解除
        if ($request->is_default) {

            WorkTypeMaster::query()
                ->update([
                    'is_default' => false
                ]);
        }

        $workType->update([

            'name' =>
            $request->name,

            'is_visible' =>
            $request->is_visible,

            'is_default' =>
            $request->is_default,

            'display_order' =>
            $request->display_order,
        ]);

        return response()->json([
            'success' => true,
        ]);
    }

    public function moveUp($id)
    {
        $current =
            WorkTypeMaster::findOrFail($id);

        $previous =
            WorkTypeMaster::where(
                'display_order',
                '<',
                $current->display_order
            )
            ->orderByDesc(
                'display_order'
            )
            ->first();

        if ($previous) {

            $currentOrder =
                $current->display_order;

            $current->update([
                'display_order' =>
                $previous->display_order
            ]);

            $previous->update([
                'display_order' =>
                $currentOrder
            ]);
        }

        return response()->json([
            'success' => true,
        ]);
    }

    public function moveDown($id)
    {
        $current =
            WorkTypeMaster::findOrFail($id);

        $next =
            WorkTypeMaster::where(
                'display_order',
                '>',
                $current->display_order
            )
            ->orderBy(
                'display_order'
            )
            ->first();

        if ($next) {

            $currentOrder =
                $current->display_order;

            $current->update([
                'display_order' =>
                $next->display_order
            ]);

            $next->update([
                'display_order' =>
                $currentOrder
            ]);
        }

        return response()->json([
            'success' => true,
        ]);
    }

    public function create()
    {
        return Inertia::render(
            'System/WorkType/Create'
        );
    }

    public function store(
        Request $request
    ) {

        // デフォルトにする場合、
        // 他のデフォルトを解除
        if ($request->is_default) {

            WorkTypeMaster::query()
                ->update([
                    'is_default' => false
                ]);
        }

        WorkTypeMaster::create([

            'code' =>
            strtoupper(
                uniqid('CUSTOM_')
            ),

            'name' =>
            $request->name,

            'is_visible' =>
            $request->is_visible,

            'is_default' =>
            $request->is_default,

            'display_order' =>
            WorkTypeMaster::max(
                'display_order'
            ) + 1,
        ]);

        return response()->json([
            'success' => true,
        ]);
    }
}
