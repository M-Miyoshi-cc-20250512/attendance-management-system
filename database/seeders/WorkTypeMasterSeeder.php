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
            ],
            [
                'code' => 'LEAVE',
                'name' => '休職',
            ],
            [
                'code' => 'FLEX',
                'name' => '出勤（FLEX）',
            ],
            [
                'code' => 'SHIFT_0900_1800',
                'name' => '09:00-18:00',
            ],
            [
                'code' => 'SHIFT_1000_1900',
                'name' => '10:00-19:00',
            ],
            [
                'code' => 'SHIFT_1100_2000',
                'name' => '11:00-20:00',
            ],
        ]);
    }
}
