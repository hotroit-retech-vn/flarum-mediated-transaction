<?php

use Illuminate\Database\Schema\Blueprint;

use Flarum\Database\Migration;

return Migration::createTable(
    'rvn_pay_requests',
    function (Blueprint $table) {
        $table->increments('id');
        $table->decimal('rvn_monney', 10,2)->nullable();
        $table->tinyInteger('rvn_status')->default(1);
        $table->text('rvn_note')->nullable();
        $table->unsignedInteger('rvn_create_by');
        $table->unsignedInteger('rvn_bank_id');
        $table->foreign('rvn_create_by')->references('id')->on('users')->onDelete('cascade');
        $table->foreign('rvn_bank_id')->references('id')->on('rvn_bank_infos')->onDelete('cascade');
        // created_at & updated_at
        $table->timestamps();
    }
);

