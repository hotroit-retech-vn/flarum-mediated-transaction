<?php

use Illuminate\Database\Schema\Blueprint;

use Illuminate\Database\Schema\Builder;

// HINT: you might want to use a `Flarum\Database\Migration` helper method for simplicity!
// See https://docs.flarum.org/extend/models.html#migrations to learn more about migrations.
return [
    'up' => function (Builder $schema) {
        // if (!$schema->hasTable('rvn_transactions')) {
            $schema->create('rvn_transactions', function (Blueprint $table) {
                $table->id(); 
                $table->unsignedInteger('rvn_creator_id');
                $table->unsignedInteger('rvn_receiver_id');
                $table->integer('rvn_amount', 10);
                $table->decimal('rvn_fee', 3, 2)->default(0.1);
                $table->unsignedInteger('rvn_ayer_id')->nullable();
                $table->text('rvn_note')->nullable();
                $table->foreign('rvn_creator_id')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('rvn_receiver_id')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('rvn_payer_id')->references('id')->on('users')->onDelete('set null');
                
            });
        // }
    },
    'down' => function (Builder $schema) {
        $schema->drop('rvn_transactions');
    }
];
