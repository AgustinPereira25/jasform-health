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
        Schema::create('form_activities', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date_time');
            $table->string('description')->nullable();
            $table->boolean('completed');
            $table->integer('completed_questions')->nullable();
            $table->timestamps();

            $table->unsignedBigInteger('form_instance_id');
            $table->foreign('form_instance_id')->references('id')->on('form_instances');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_activities');
    }
};
