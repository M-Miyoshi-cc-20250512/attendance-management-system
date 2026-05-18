<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('work_type_master', function (Blueprint $table) {
            $table->id();

            $table->string('code', 20)
                ->unique();

            $table->string('name', 100);

            $table->boolean('is_attendance_counted')
                ->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_type_master');
    }
};
