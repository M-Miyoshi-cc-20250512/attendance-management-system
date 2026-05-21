<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('monthly_closings', function (Blueprint $table) {

            $table->id();

            $table->char('closing_ym', 7);

            $table->foreignId('department_id')
                ->nullable()
                ->constrained('departments');

            $table->foreignId('location_id')
                ->nullable()
                ->constrained('locations');

            $table->string('status', 20);

            $table->foreignId('closed_by_user_id')
                ->nullable()
                ->constrained('users');

            $table->dateTime('closed_at')
                ->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('monthly_closings');
    }
};