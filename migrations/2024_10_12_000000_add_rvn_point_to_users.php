<?php

use Illuminate\Database\Schema\Blueprint;

use Illuminate\Database\Schema\Builder;

// HINT: you might want to use a `Flarum\Database\Migration` helper method for simplicity!
// See https://docs.flarum.org/extend/models.html#migrations to learn more about migrations.
return [
    'up' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->integer('rvn_point')->default(0);
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('users', function (Blueprint $table) {
            $table->integer('rvn_point')->default(0);
        });
    }
];
