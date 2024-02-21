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
            $table->string('final_text')->nullable();;
            $table->string('description')->nullable();
            $table->dateTime('creation_date_time');
            $table->dateTime('last_modified_date_time')->nullable();
            $table->string('logo')->nullable();
            $table->string('primary_color')->nullable();
            $table->string('secondary_color')->nullable();
            $table->string('rounded_style')->nullable();
            $table->string('api_url')->nullable();
            $table->boolean('is_active');
            $table->boolean('is_user_responses_linked');
            $table->boolean('is_initial_data_required');
            $table->string('public_code')->unique();
            $table->timestamps();

            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');

            $table->index('name');
            $table->index('public_code');
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
