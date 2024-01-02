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
        Schema::create('forms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('welcome_text');
            $table->string('description');
            $table->dateTime('creation_date_time');
            $table->binary('logo');
            $table->string('primary_color');
            $table->string('secondary_color');
            $table->string('rounded_style');
            $table->string('api_url');
            $table->string('status');
            $table->string('public_code');
            $table->timestamps();

            $table->unsignedBigInteger('user_creator_id');
            $table->foreign('user_creator_id')->references('id')->on('users');

            $table->unsignedBigInteger('user_auxiliary_editor_id');
            $table->foreign('user_auxiliary_editor_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('forms');
    }
};
