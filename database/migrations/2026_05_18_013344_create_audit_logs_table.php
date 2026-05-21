<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('audit_logs', function (Blueprint $table) {

            $table->id();

            $table->foreignId('actor_user_id')
                ->constrained('users');

            $table->foreignId('target_user_id')
                ->nullable()
                ->constrained('users');

            $table->string('action', 50);

            $table->string('target_table', 100)
                ->nullable();

            $table->bigInteger('target_record_id')
                ->nullable();

            $table->json('before_value')
                ->nullable();

            $table->json('after_value')
                ->nullable();

            $table->string('ip_address', 64)
                ->nullable();

            $table->string('user_agent', 500)
                ->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};