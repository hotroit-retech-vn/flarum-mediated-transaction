<?php

use Illuminate\Database\Schema\Blueprint;

use Flarum\Database\Migration;

return Migration::createTable(
    'rvn_bank_transactions',
    function (Blueprint $table) {
        $table->increments('id');
        $table->unsignedBigInteger('rvn_transaction_id')->nullable();
        $table->text('rvn_content')->nullable();
        $table->decimal('rvn_amount', 10, 2);
        $table->timestamp('rvn_date');
        $table->string('rvn_transid', 200)->unique();
        $table->string('rvn_account_receiver', 50);
        // created_at & updated_at
        $table->timestamps();
    }
);

