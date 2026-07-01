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
        Schema::create('leave_applications', function (Blueprint $table) {

            $table->id();

            $table->foreignId('user_id')
                ->constrained('users')
                ->comment('申請者');

            $table->date('application_date')
                ->comment('対象日');

            $table->unique([
                'user_id',
                'application_date'
            ]);

            $table->foreignId('leave_type_id')
                ->constrained('leave_type_master')
                ->comment('休暇種別');

            $table->text('reason')
                ->nullable()
                ->comment('申請理由');

            $table->string('status', 20)
                ->default('未申請')
                ->comment('申請状態');

            $table->text('approver_comment')
                ->nullable()
                ->comment('承認コメント');

            $table->timestamp('approved_at')
                ->nullable()
                ->comment('承認日時');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leave_applications');
    }
};
