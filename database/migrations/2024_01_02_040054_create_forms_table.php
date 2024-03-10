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
            $table->text('welcome_text');
            $table->text('final_text')->nullable();;
            $table->text('description')->nullable();
            $table->dateTime('creation_date_time');
            $table->dateTime('last_modified_date_time')->nullable();
            $table->text('logo')->nullable();
            $table->string('primary_color')->nullable();
            $table->string('secondary_color')->nullable();
            $table->string('rounded_style')->nullable();
            $table->text('api_url')->nullable();
            $table->text('html_head')->nullable();
            $table->text('html_body')->nullable();
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
