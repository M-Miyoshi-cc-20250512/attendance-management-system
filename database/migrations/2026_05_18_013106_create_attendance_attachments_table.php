<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attendance_attachments', function (Blueprint $table) {

            $table->id();

            $table->foreignId('attendance_daily_id')
                ->constrained('attendance_daily')
                ->onDelete('cascade');

            $table->string('file_name', 255);

            $table->string('file_path', 500);

            $table->string('file_mime_type', 100);

            $table->bigInteger('file_size_bytes');

            $table->foreignId('uploaded_by_user_id')
                ->constrained('users');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attendance_attachments');
    }
};