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
            $table->string('description')->nullable();
            $table->dateTime('creation_date_time');
            $table->dateTime('last_modified_date_time')->nullable();
            $table->string('logo')->nullable();
            $table->string('primary_color')->nullable();
            $table->string('secondary_color')->nullable();
            $table->string('rounded_style')->nullable();
            $table->string('api_url')->nullable();
            $table->boolean('is_active');
            $table->boolean('is_anonymous_user_answers');
            $table->boolean('is_request_mandatory_initial_data');
            $table->string('public_code')->unique();
            $table->timestamps();

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
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
