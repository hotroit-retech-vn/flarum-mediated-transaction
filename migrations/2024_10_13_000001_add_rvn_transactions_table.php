<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

// See https://docs.flarum.org/extend/models.html#migrations to learn more about migrations.
return [
    'up' => function (Builder $schema) {
        if (!$schema->hasTable('rvn_transactions')) {
            $schema->create('rvn_transactions', function (Blueprint $table) {
                $table->id();
                $table->string('rvn_title', 120)->nullable();
                $table->unsignedInteger('rvn_creator_id');
                $table->unsignedInteger('rvn_receiver_id');
                $table->unsignedInteger('rvn_amount');
                $table->decimal('rvn_fee', 3, 2)->default(0.10);
                $table->unsignedInteger('rvn_payer_id')->nullable();
                $table->text('rvn_note')->nullable();

                $table->foreign('rvn_creator_id')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('rvn_receiver_id')->references('id')->on('users')->onDelete('cascade');
                $table->foreign('rvn_payer_id')->references('id')->on('users')->onDelete('set null');

                $table->timestamps();
            });
        }
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('rvn_transactions');
    }
];
