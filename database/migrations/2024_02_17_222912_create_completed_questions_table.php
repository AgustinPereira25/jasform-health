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
        Schema::create('completed_questions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('answer');
            $table->string('mapping_key')->nullable();
            $table->unsignedBigInteger('form_instance_id');
            $table->unsignedBigInteger('question_type_id');
            $table->timestamps();

            $table->foreign('form_instance_id')->references('id')->on('form_instances')->onDelete('cascade');
            $table->foreign('question_type_id')->references('id')->on('question_types')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('completed_questions');
    }
};
