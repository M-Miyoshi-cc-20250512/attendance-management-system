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
        Schema::create('attendance_daily', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');

            $table->date('target_date');

            $table->foreignId('work_type_id')
                ->constraind('work_type_master');

            $table->foreignId('location_id')
                ->constrained('locations');

            $table->dateTime('start_at')
                ->nullable();

            $table->dateTime('end_at')
                ->nullable();

            $table->boolean('is_next_day')
                ->default(false);

            $table->integer('transportation_cost')
                ->nullable();

            $table->text('remarks')
                ->nullable();

            $table->string('status', 20)
                ->default('未申請');

            $table->text('approved_comment')
                ->nullable();

            $table->foreignId('raw_in_punch_id')
                ->nullable()
                ->constrained('attendance_raw_punches');

            $table->foreignId('raw_out_punch_id')
                ->nullable()
                ->constrained('attendance_raw_punches');

            $table->integer('actual_work_minutes')
                ->nullable();
            
            $table->integer('overtime_minutes')
                ->nullable();

            $table->integer('late_night_minutes')
                ->nullable();

            $table->timestamps();

            $table->unique(['user_id','target_date']);  
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance_daily');
    }
};
