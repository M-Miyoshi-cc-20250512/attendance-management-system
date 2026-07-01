<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class WorkTypeMasterSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('work_type_master')->insert([

            [
                'code' => 'HOLIDAY',
                'name' => '公休',
                'is_attendance_counted' => false,
                'start_time' => null,
                'end_time' => null,
                'break_minutes' => 0,
                'is_visible' => true,
                'display_order' => 1,
                'is_default' => false,
            ],

            [
                'code' => 'LEAVE',
                'name' => '休職',
                'is_attendance_counted' => false,
                'start_time' => null,
                'end_time' => null,
                'break_minutes' => 0,
                'is_visible' => true,
                'display_order' => 2,
                'is_default' => false,
            ],

            [
                'code' => 'FLEX',
                'name' => '出勤（FLEX）',
                'is_attendance_counted' => true,
                'start_time' => null,
                'end_time' => null,
                'break_minutes' => 60,
                'is_visible' => true,
                'display_order' => 3,
                'is_default' => false,
            ],

            [
                'code' => 'SHIFT_0900_1800',
                'name' => '09:00-18:00',
                'is_attendance_counted' => true,
                'start_time' => '09:00:00',
                'end_time' => '18:00:00',
                'break_minutes' => 60,
                'is_visible' => true,
                'display_order' => 4,
                'is_default' => true,
            ],

            [
                'code' => 'SHIFT_1000_1900',
                'name' => '10:00-19:00',
                'is_attendance_counted' => true,
                'start_time' => '10:00:00',
                'end_time' => '19:00:00',
                'break_minutes' => 60,
                'is_visible' => true,
                'display_order' => 5,
                'is_default' => false,
            ],

            [
                'code' => 'SHIFT_1100_2000',
                'name' => '11:00-20:00',
                'is_attendance_counted' => true,
                'start_time' => '11:00:00',
                'end_time' => '20:00:00',
                'break_minutes' => 60,
                'is_visible' => true,
                'display_order' => 6,
                'is_default' => false,
            ],

        ]);
    }
}
