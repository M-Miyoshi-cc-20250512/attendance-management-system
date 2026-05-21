<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendance_approvals', function (Blueprint $table) {

            $table->id();

            $table->foreignId('attendance_daily_id')
                ->constrained('attendance_daily')
                ->onDelete('cascade');

            $table->foreignId('approver_user_id')
                ->constrained('users');

            $table->string('action_type', 20);

            $table->text('comment')
                ->nullable();

            $table->dateTime('acted_at');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendance_approvals');
    }
};