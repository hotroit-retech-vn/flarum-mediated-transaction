<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

// See https://docs.flarum.org/extend/models.html#migrations to learn more about migrations.
return [
    'up' => function (Builder $schema) {
        if (!$schema->hasTable('rvn_transaction_logs')) {
            $schema->create('rvn_transaction_logs', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('rvn_transaction_id');
                $table->unsignedInteger('rvn_user_id');
                $table->tinyInteger('rvn_status_old')->nullable()->default(1);
                $table->tinyInteger('rvn_status')->default(1);
                $table->text('rvn_reason')->nullable();
                $table->timestamps();

                $table->foreign('rvn_transaction_id')->references('id')->on('rvn_transactions')->onDelete('cascade');
                $table->foreign('rvn_user_id')->references('id')->on('users')->onDelete('cascade');
            });
        }
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('rvn_transaction_logs');
    }
];
