<?php

namespace RetechVN\MediatedTransaction;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;
use Flarum\User\User;

class BankInfo extends AbstractModel
{
    // See https://docs.flarum.org/extend/models.html#backend-models for more information.

    protected $table = 'rvn_bank_infos';

    public $timestamps = true;
    protected $fillable = ['rvn_bankacc_name', 'rvn_bankacc_number', 'rvn_bank_name', 'rvn_create_by'];

    public function user() {
        return $this->belongsTo(User::class, 'rvn_create_by');
    }
}
