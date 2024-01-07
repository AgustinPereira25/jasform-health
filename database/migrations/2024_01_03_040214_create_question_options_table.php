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
        Schema::create('question_options', function (Blueprint $table) {
            $table->id();
            $table->integer('order');
            $table->string('name');
            $table->string('description')->nullable();
            $table->timestamps();

            $table->unsignedBigInteger('next_question')->nullable();
            $table->foreign('next_question')->references('id')->on('form_questions');

            $table->unsignedBigInteger('form_question_id');
            $table->foreign('form_question_id')->references('id')->on('form_questions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('question_options');
    }
};
