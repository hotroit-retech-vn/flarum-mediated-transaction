<?php

use Illuminate\Database\Schema\Blueprint;

use Flarum\Database\Migration;

return Migration::createTable(
    'rvn_bank_infos',
    function (Blueprint $table) {
        $table->increments('id');
        $table->string('rvn_bankacc_name', 100)->nullable();
        $table->string('rvn_bankacc_number', 100)->nullable();
        $table->string('rvn_bank_name', 100)->nullable();
        $table->tinyInteger('rvn_status')->default(1);
        $table->unsignedInteger('rvn_create_by');
        $table->foreign('rvn_create_by')->references('id')->on('users')->onDelete('cascade');
        // created_at & updated_at
        $table->timestamps();
    }
);

