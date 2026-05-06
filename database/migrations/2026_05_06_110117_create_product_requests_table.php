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
        Schema::create('product_requests', function (Blueprint $label) {
            $label->id();
            $label->foreignId('user_id')->constrained()->onDelete('cascade');
            $label->foreignId('post_id')->constrained()->onDelete('cascade');
            $label->string('status')->default('pending'); // pending, approved, rejected
            $label->text('message')->nullable();
            $label->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_requests');
    }
};
