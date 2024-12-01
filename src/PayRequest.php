<?php

namespace RetechVN\MediatedTransaction;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\Foundation\EventGeneratorTrait;
use Flarum\User\User;

class PayRequest extends AbstractModel
{
    // See https://docs.flarum.org/extend/models.html#backend-models for more information.

    protected $table = 'rvn_pay_requests';

    public $timestamps = true;
    protected $fillable = ['rvn_bank_id', 'rvn_monney', 'rvn_note', 'rvn_create_by'];

    public function user() {
        return $this->belongsTo(User::class, 'rvn_create_by');
    }

    public function bank_info() {
        return $this->belongsTo(BankInfo::class, 'rvn_bank_id');
    }
}
