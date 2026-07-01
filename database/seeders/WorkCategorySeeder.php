<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\WorkCategory;

class WorkCategorySeeder extends Seeder
{
    public function run(): void
    {
        WorkCategory::create([
            'name' => '一般社員'
        ]);

        WorkCategory::create([
            'name' => '管理職'
        ]);

        WorkCategory::create([
            'name' => 'パート'
        ]);

        WorkCategory::create([
            'name' => 'アルバイト'
        ]);
    }
}