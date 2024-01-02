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
        Schema::create('form_instances', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date_time');
            $table->timestamps();

            $table->unsignedBigInteger('form_id');
            $table->foreign('form_id')->references('id')->on('forms');

            $table->unsignedBigInteger('completer_user_id');
            $table->foreign('completer_user_id')->references('id')->on('completer_users');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_instances');
    }
};
