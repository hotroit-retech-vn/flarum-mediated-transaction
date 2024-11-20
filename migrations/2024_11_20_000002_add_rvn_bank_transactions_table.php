<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        if (!$schema->hasTable('rvn_bank_transactions')) {
            $schema->create('rvn_bank_transactions', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('rvn_transaction_id')->nullable();
                $table->text('rvn_content')->nullable();
                $table->decimal('rvn_amount', 10, 2);
                $table->timestamp('rvn_date');
                $table->string('rvn_transid', 200)->unique();
                $table->string('rvn_account_receiver', 50);

                $table->timestamps();
            });
        }
    },
    'down' => function (Builder $schema) {
        $schema->dropIfExists('rvn_bank_transactions');
    }
];
