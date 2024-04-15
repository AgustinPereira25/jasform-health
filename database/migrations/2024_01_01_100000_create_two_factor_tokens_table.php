<?php

declare(strict_types=1);

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
        Schema::create('two_factor_tokens', function (Blueprint $table) {
            $table->string('email');
            $table->string('token');
            $table->string('token_type');
            $table->timestamp('created_at')->nullable();

            $table->primary(['email', 'token', 'token_type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('two_factor_tokens');
    }
};
