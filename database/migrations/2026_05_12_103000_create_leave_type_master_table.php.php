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
        Schema::create('leave_type_master', function (Blueprint $table) {

            $table->id();

            $table->string('code', 20)
                ->unique()
                ->comment('休暇コード');

            $table->string('name', 100)
                ->comment('休暇名称');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_type_master');
    }
};
