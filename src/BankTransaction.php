<?php

namespace RetechVN\MediatedTransaction;

use Flarum\Database\AbstractModel;
use Flarum\Database\ScopeVisibilityTrait;
use Flarum\User\User;

class BankTransaction extends AbstractModel
{
    use ScopeVisibilityTrait;
    // See https://docs.flarum.org/extend/models.html#backend-models for more information.

    protected $table = 'rvn_bank_transactions';
    public $timestamps = true;

    protected $fillable = ['rvn_transaction_id', 'rvn_amount', 'rvn_content', 'rvn_date', 'rvn_transid', 'rvn_account_receiver'];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class, 'rvn_transaction_id');
    }
}
