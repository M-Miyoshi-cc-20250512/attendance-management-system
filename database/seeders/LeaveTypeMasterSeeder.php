<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LeaveTypeMasterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('leave_type_master')->insert([
            [
                'code' => 'FURI',
                'name' => '振出',
            ],
            [
                'code' => 'PAID',
                'name' => '有休',
            ],
            [
                'code' => 'AM_PAID',
                'name' => '午前有休',
            ],
            [
                'code' => 'PM_PAID',
                'name' => '午後有休',
            ],
            [
                'code' => 'LEGAL_HOLIDAY',
                'name' => '法定休出',
            ],
            [
                'code' => 'NON_LEGAL_HOLIDAY',
                'name' => '法外休出',
            ],
            [
                'code' => 'SPECIAL_PAID',
                'name' => '特別有給休暇',
            ],
            [
                'code' => 'ABSENCE',
                'name' => '欠勤',
            ],
            [
                'code' => 'COMPENSATORY',
                'name' => '代休',
            ],
        ]);
    }
}